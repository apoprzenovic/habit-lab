import React, {useContext} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import ThemeContext from '../ThemeContext';

const AboutUsScreen = ({username}) => {
  const {isDark} = useContext(ThemeContext);

  const themeStyles = {
    backgroundColor: isDark ? 'black' : 'white',
    color: isDark ? 'white' : 'black',
  };

  return (
    <ScrollView style={themeStyles}>
      <View style={styles.container}>
        <Text style={[styles.title, {color: themeStyles.color}]}>About Us</Text>
        <View
          style={{
            marginTop: 20,
            marginBottom: 20,
            borderBottomColor: themeStyles.color,
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <Text
          style={[
            {fontSize: 18, textAlign: 'justify', lineHeight: 30},
            {color: themeStyles.color},
          ]}>
          Welcome to Habit Lab! We are a productivity app designed to help you
          achieve your goals by tracking your daily habits.{'\n'}
          {'\n'}Our app takes events events from your Google Calendar and
          displays them in a simple and intuitive interface. We understand the
          importance of time management and the impact it has on achieving your
          goals. That's why we created Habit Lab, to make it easier for you to
          stay on track with your daily tasks and improve your productivity.
          {'\n'}
          {'\n'}Our founder, Arnes Poprzenovic, is a passionate student at the
          university who understands the challenges of balancing a busy schedule
          while maintaining a healthy lifestyle. He wanted to create a solution
          that could help people achieve their goals without sacrificing their
          personal time. With his expertise in software development, Arnes
          created Habit Lab to make productivity and and goal-setting more
          accessible to everyone.{'\n'}
          {'\n'}At Habit Lab, we believe that small daily habits can have a
          significant impact on achieving long-term goals. Our app helps you
          keep track of your progress, analyze your habits, and make adjustments
          to your routine to improve your productivity.{'\n'}
          {'\n'}We strive to provide our users with a personalized experience
          that helps them achieve their unique goals. Thank you for choosing
          Habit Lab to help you achieve your goals. We're excited to be a part
          of your journey towards a more productive and fulfilling life!
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 20,
    marginTop: 50,
    marginRight: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default AboutUsScreen;
