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

const SignInScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState(''); // This line continues from the previous snippet.

  const validateEmail = email => {
    // Use a regex pattern to validate the email format
    const pattern = /^[\w-]+(.[\w-]+)*@([\w-]+.)+[a-zA-Z]{2,7}$/;
    return pattern.test(email);
  };

  const isSignInEnabled = () => {
    return email.length > 0 && password.length > 0 && validateEmail(email);
  };

  const handleSignIn = async () => {
    try {
      const storedUserData = await AsyncStorage.getItem(`user:${email}`);
      if (!storedUserData) {
        Alert.alert('Error', 'No account found with this email.');
        return;
      }
      const user = JSON.parse(storedUserData);
      const isPasswordValid = bcrypt.compareSync(password, user.password);

      if (isPasswordValid) {
        navigation.navigate('MainScreen', {username: user.username});
      } else {
        Alert.alert('Error', 'Incorrect password. Please try again.');
      }
    } catch (error) {
      Alert.alert('Error', 'There was an error signing in. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="gray"
        onChangeText={text => {
          setEmail(text);
          setEmailError(!validateEmail(text) ? 'Invalid email' : '');
        }}
        value={email}
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="gray"
        secureTextEntry
        onChangeText={text => setPassword(text)}
        value={password}
      />
      <TouchableOpacity
        style={styles.signInButton}
        onPress={handleSignIn}
        disabled={!isSignInEnabled()}>
        <Text style={styles.signInButtonText}>Sign in</Text>
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
  signInButton: {
    width: '90%',
    backgroundColor: 'black',
    borderRadius: 1,
    border: 1,
    padding: 10,
    marginTop: 60,
  },
  signInButtonText: {
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
});

export default SignInScreen;
