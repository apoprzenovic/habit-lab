import React, {useState} from 'react';
import BottomTabNavigator from './components/BottomTabNavigator';
import ThemeContext from './screens/ThemeContext';

const MainScreen = ({route}) => {
  const [isDark, setIsDark] = useState(false);
  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const themeValue = {
    isDark,
    toggleTheme,
  };

  const username = route.params?.username;
  return (
    <ThemeContext.Provider value={themeValue}>
      <BottomTabNavigator username={username} />
    </ThemeContext.Provider>
  );
};

export default MainScreen;
