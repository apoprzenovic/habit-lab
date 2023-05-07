import React, {useContext, useState, useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import ThemeContext from '../ThemeContext';

const SettingsScreen = ({username, navigation}) => {
  const {isDark, toggleTheme} = useContext(ThemeContext);
  const [themeStyles, setThemeStyles] = useState({});
  const [buttonStyles, setButtonStyles] = useState({});
  const [headerStyles, setHeaderStyles] = useState({});

  useEffect(() => {
    setThemeStyles({
      backgroundColor: isDark ? 'black' : 'white',
      color: isDark ? 'white' : 'black',
    });

    setButtonStyles({
      backgroundColor: isDark ? 'white' : 'black',
      color: isDark ? 'black' : 'white',
    });

    setHeaderStyles({
      backgroundColor: isDark ? 'gray' : 'lightgray',
      color: isDark ? 'white' : 'black',
    });
  }, [isDark]);

  const handleLogout = () => {
    navigation.navigate('SplashScreen');
  };

  return (
    <View style={[styles.container, themeStyles]}>
      <View style={[styles.titleContainer, headerStyles]}>
        <Text style={[styles.title, headerStyles]}>Settings</Text>
      </View>
      <TouchableOpacity
        style={[styles.themeToggleButton, buttonStyles]}
        onPress={toggleTheme}>
        <Text style={[styles.themeToggleText, {color: buttonStyles.color}]}>
          {isDark ? 'Light' : 'Dark'} Mode
        </Text>
      </TouchableOpacity>

      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[styles.logOutButton, buttonStyles]}
          onPress={handleLogout}>
          <Text style={[styles.logOutText, {color: buttonStyles.color}]}>
            Logout
          </Text>
        </TouchableOpacity>
        <Text style={[styles.version, themeStyles]}>
          Current application version SNAPSHOT-1.1
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  titleContainer: {
    backgroundColor: 'lightgray',
    width: '120%',
    padding: 20,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  settingTitle: {
    fontSize: 18,
  },
  bottomContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    top: '60%',
  },
  logOutButton: {
    width: 200,
    backgroundColor: 'black',
    borderRadius: 1,
    border: 1,
    padding: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  logOutText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  themeToggleButton: {
    width: '90%',
    backgroundColor: 'black',
    borderRadius: 1,
    border: 1,
    padding: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  themeToggleText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});
export default SettingsScreen;
