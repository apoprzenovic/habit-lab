import React, {useContext} from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import ThemeContext from '../ThemeContext';

const SatisfiedUsersScreen = ({username}) => {
  const {isDark} = useContext(ThemeContext);

  const themeStyles = {
    backgroundColor: isDark ? 'black' : 'white',
    color: isDark ? 'white' : 'black',
  };

  return (
    <ScrollView style={themeStyles}>
      <View style={styles.container}>
        <Text style={[styles.title, {color: themeStyles.color}]}>
          User Testimonials
        </Text>
        <View
          style={{
            marginTop: 20,
            marginBottom: 20,
            borderBottomColor: themeStyles.color,
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />

        <View style={styles.testimonial}>
          <Image
            source={require('../../assets/images/person1.png')}
            style={styles.image}
          />
          <Text style={[styles.text, {color: themeStyles.color}]}>
            "This app has been a game-changer for me. It helped me stay on track
            with my habits and achieve my goals. Highly recommended!" - John Doe
          </Text>
        </View>

        <View style={styles.testimonial}>
          <Text style={[styles.text, {color: themeStyles.color}]}>
            "I've been using this app for a few months now, and it has
            significantly improved my productivity. The interface is
            user-friendly, and it's easy to track my progress. Love it!" - Jane
            Smith
          </Text>
          <Image
            source={require('../../assets/images/person2.png')}
            style={styles.image}
          />
        </View>

        <View style={styles.testimonial}>
          <Image
            source={require('../../assets/images/person3.png')}
            style={styles.image}
          />
          <Text style={[styles.text, {color: themeStyles.color}]}>
            "A fantastic app to help build and maintain positive habits. The
            analytics and reminders have been invaluable in keeping me
            motivated. Thank you for creating this app!" - Guy Jones
          </Text>
        </View>
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
  testimonial: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    margin: 5,
    marginRight: 10,
    marginLeft: 5,
  },
  text: {
    flex: 1,
    fontSize: 18,
    textAlign: 'justify',
    lineHeight: 30,
    marginRight: 10,
    marginLeft: 20,
  },
});

export default SatisfiedUsersScreen;
