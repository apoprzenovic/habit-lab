// BottomTabNavigator.js
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/main/HomeScreen';
import UserScreen from '../screens/main/UserScreen';
import SettingsScreen from '../screens/main/SettingsScreen';
import AboutUsScreen from '../screens/main/AboutUsScreen';
import SatisfiedUsersScreen from '../screens/main/SatisfiedUsersScreen';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = ({username}) => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home';
          } else if (route.name === 'User') {
            iconName = focused ? 'user' : 'user';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'setting' : 'setting';
          } else if (route.name === 'About Us') {
            iconName = focused ? 'infocirlceo' : 'infocirlceo';
          } else if (route.name === 'Testimonials') {
            iconName = focused ? 'staro' : 'staro';
          }

          return <AntDesign name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: {
          fontWeight: 'bold',
          fontSize: 11,
          paddingBottom: 7,
        },
        tabBarStyle: [
          {
            display: 'flex',
            height: 60,
          },
          null,
        ],
      })}>
      <Tab.Screen
        name="About Us"
        options={{headerShown: false}}
        children={() => <AboutUsScreen username={username} />}
      />
      <Tab.Screen
        name="Testimonials"
        options={{headerShown: false}}
        children={() => <SatisfiedUsersScreen username={username} />}
      />
      <Tab.Screen
        name="Home"
        options={{headerShown: false}}
        children={() => <HomeScreen username={username} />}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{headerShown: false}}
        initialParams={{username: username}}
      />
      <Tab.Screen
        name="User"
        options={{headerShown: false}}
        children={() => <UserScreen username={username} />}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
