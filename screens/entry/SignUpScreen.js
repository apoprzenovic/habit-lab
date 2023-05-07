import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import bcrypt from 'react-native-bcrypt';

const SignUpScreen = ({navigation}) => {
  // Add state for form fields, error messages, and validation
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [repeatPasswordError, setRepeatPasswordError] = useState('');

  const validateEmail = email => {
    // Use a regex pattern to validate the email format
    const pattern = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return pattern.test(email);
  };

  const checkPassword = (password, repeatPassword) => {
    return password === repeatPassword;
  };

  const handleSignUp = async () => {
    try {
      const existingUser = await AsyncStorage.getItem(`user:${email}`);
      if (existingUser) {
        Alert.alert(
          'Error',
          'An account with this email already exists. Please use a different email.',
        );
        return;
      }

      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);
      const user = {
        email,
        username,
        password: hashedPassword,
      };
      await AsyncStorage.setItem(`user:${email}`, JSON.stringify(user));
      await AsyncStorage.setItem(username, JSON.stringify(user));
      navigation.navigate('MainScreen', {username});
    } catch (error) {
      Alert.alert(
        'Error',
        'There was an error while signing up. Please try again.',
      );
    }
  };

  const isSignUpEnabled = () => {
    const errorBool =
      emailError === '' && passwordError === '' && repeatPasswordError === '';
    const inputBool =
      email.length > 5 && username.length > 1 && password.length > 7;

    const finalBool = errorBool && inputBool;

    console.log(finalBool);

    return finalBool;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up Via Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="gray"
        onChangeText={text => {
          setEmail(text);
          setEmailError(!validateEmail(text) ? 'Invalid email!' : '');
        }}
        value={email}
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="gray"
        onChangeText={text => setUsername(text)}
        value={username}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="gray"
        secureTextEntry
        onChangeText={text => {
          setPassword(text);
          setPasswordError(
            text.length < 8 ? 'Password must be 8 characters!' : '',
          );
        }}
        value={password}
      />
      {passwordError ? (
        <Text style={styles.passwordErrorText}>{passwordError}</Text>
      ) : null}
      <TextInput
        style={styles.input}
        placeholder="Repeat Password"
        placeholderTextColor="gray"
        secureTextEntry
        onChangeText={text => {
          setRepeatPassword(text);
          setRepeatPasswordError(
            !checkPassword(password, text) ? 'Passwords must match!' : '',
          );
        }}
        value={repeatPassword}
      />
      {repeatPasswordError ? (
        <Text style={styles.repeatPasswordErrorText}>
          {repeatPasswordError}
        </Text>
      ) : null}
      <TouchableOpacity
        style={styles.signUpButton}
        onPress={handleSignUp}
        disabled={!isSignUpEnabled()}>
        <Text style={styles.signUpButtonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.returnButton}
        onPress={() => navigation.goBack()}>
        <Text style={styles.returnButtonText}>Return</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
    marginBottom: 0,
    marginTop: 80,
  },
  input: {
    width: '90%',
    borderBottomWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 5,
    marginTop: 50,
    paddingBottom: 10,
  },
  signUpButton: {
    width: '90%',
    backgroundColor: 'black',
    borderRadius: 1,
    border: 1,
    padding: 10,
    marginTop: 60,
  },
  signUpButtonText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },
  returnButton: {
    width: '90%',
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    marginTop: 10,
  },
  returnButtonText: {
    color: 'black',
    fontSize: 15,
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    marginTop: 5,
    paddingRight: 260,
  },
  passwordErrorText: {
    color: 'red',
    marginTop: 5,
    paddingRight: 140,
  },
  repeatPasswordErrorText: {
    color: 'red',
    marginTop: 5,
    paddingRight: 190,
  },
});

export default SignUpScreen;
