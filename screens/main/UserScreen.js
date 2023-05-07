import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import bcrypt from 'react-native-bcrypt';
import {Line} from 'react-native-svg';
import ThemeContext from '../ThemeContext';

const UserScreen = ({username}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState({});
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const {isDark} = useContext(ThemeContext);

  const themeStyles = {
    backgroundColor: isDark ? 'black' : 'white',
    color: isDark ? 'white' : 'black',
  };

  const inputStyles = {
    borderColor: isDark ? 'white' : 'gray',
  };

  const buttonStyles = {
    backgroundColor: isDark ? 'white' : 'black',
  };

  const buttonText = {
    color: isDark ? 'black' : 'white',
  };

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const storedData = await AsyncStorage.getItem(username);
    if (storedData) {
      const userData = JSON.parse(storedData);
      setName(userData.name);
      setEmail(userData.email);
      setPassword(userData.password);
      setUserData(userData);
    }
  };

  const updateUserData = async (field, value) => {
    const updatedData = {
      ...userData,
      [field]: value,
    };
    await AsyncStorage.setItem(username, JSON.stringify(updatedData));
    setUserData(updatedData);
  };

  const handleUpdate = async field => {
    if (field === 'name' && name.trim() !== '') {
      await updateUserData('name', name);
    } else if (
      field === 'email' &&
      email.trim() !== '' &&
      email.includes('@')
    ) {
      await updateUserData('email', email);
    } else if (
      field === 'password' &&
      password.trim() !== '' &&
      password.length >= 8
    ) {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);
      await updateUserData('password', hashedPassword);
    } else {
      alert('Invalid input. Please try again.');
    }
    await getUserData();
  };

  const validateEmail = email => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  return (
    <View style={[styles.container, themeStyles]}>
      <Text style={[styles.title, {color: themeStyles.color}]}>
        {name !== '' || name !== null ? name : username}
      </Text>
      <View
        style={{
          width: '80%',
          height: 1,
          backgroundColor: themeStyles.color,
          marginVertical: 7,
        }}
      />
      <Text style={[styles.label, {color: themeStyles.color}]}>Name:</Text>
      <TextInput
        style={[styles.input, {color: themeStyles.color}, inputStyles]}
        value={name}
        onChangeText={text => {
          setName(text);
          setNameError(text.trim() === '' ? 'Name cannot be empty' : '');
        }}
        placeholderTextColor={isDark ? 'rgba(255, 255, 255, 0.5)' : 'gray'}
      />
      {nameError ? (
        <Text style={[styles.errorText, {color: 'red'}]}>{nameError}</Text>
      ) : null}
      <TouchableOpacity
        style={[styles.button, buttonStyles]}
        onPress={() => handleUpdate('name')}>
        <Text style={[styles.buttonText, buttonText]}>Update Name</Text>
      </TouchableOpacity>
      <Text style={[styles.label, {color: themeStyles.color}]}>Email:</Text>
      <TextInput
        style={[styles.input, {color: themeStyles.color}, inputStyles]}
        value={email}
        onChangeText={text => {
          setEmail(text);
          setEmailError(!validateEmail(text) ? 'Invalid email' : '');
        }}
        placeholderTextColor={isDark ? 'rgba(255, 255, 255, 0.5)' : 'gray'}
      />
      {emailError ? (
        <Text style={[styles.errorEmail, {color: 'red'}]}>{emailError}</Text>
      ) : null}
      <TouchableOpacity
        style={[styles.button, buttonStyles]}
        onPress={() => handleUpdate('email')}>
        <Text style={[styles.buttonText, buttonText]}>Update Email</Text>
      </TouchableOpacity>
      <Text style={[styles.label, {color: themeStyles.color}]}>Password:</Text>
      <TextInput
        style={[styles.input, {color: themeStyles.color}, inputStyles]}
        value={password}
        secureTextEntry
        onChangeText={text => {
          setPassword(text);
          setPasswordError(
            text.length < 8 ? 'Password must be at least 8 characters' : '',
          );
        }}
        placeholderTextColor={isDark ? 'rgba(255, 255, 255, 0.5)' : 'gray'}
      />
      {passwordError ? (
        <Text style={[styles.errorPassword, {color: 'red'}]}>
          {passwordError}
        </Text>
      ) : null}
      <TouchableOpacity
        style={[styles.button, buttonStyles]}
        onPress={() => handleUpdate('password')}>
        <Text style={[styles.buttonText, buttonText]}>Update Password</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginLeft: '10%',
  },
  label: {
    fontSize: 18,
    marginTop: 20,
    alignSelf: 'flex-start',
    marginLeft: '10%',
  },
  input: {
    borderWidth: 1,
    borderRadius: 4,
    width: '80%',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  button: {
    width: '80%',
    backgroundColor: 'black',
    borderRadius: 1,
    border: 1,
    padding: 10,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  errorText: {
    marginTop: 5,
    paddingRight: 160,
  },
  errorEmail: {
    marginTop: 5,
    paddingRight: 225,
  },
  errorPassword: {
    marginTop: 5,
    paddingRight: 60,
  },
});

export default UserScreen;
