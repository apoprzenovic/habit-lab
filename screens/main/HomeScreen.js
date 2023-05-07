import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {VictoryLine, VictoryChart, VictoryAxis} from 'victory-native';
import Svg from 'react-native-svg';
import RadioButtonItem from 'react-native-paper/src/components/RadioButton/RadioButtonItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ThemeContext from '../ThemeContext';

const HomeScreen = ({username}) => {
  const {isDark} = useContext(ThemeContext);

  const themeStyles = {
    container: {
      backgroundColor: isDark ? 'black' : 'white',
    },
    text: {
      color: isDark ? 'white' : 'black',
    },
    button: {
      backgroundColor: isDark ? 'white' : 'black',
    },
    buttonText: {
      color: isDark ? 'black' : 'white',
    },
  };

  const [habitList, setHabitList] = useState([]);
  const [checkedHabits, setCheckedHabits] = useState({});
  const [refreshData, setRefreshData] = useState(false);

  const [name, setName] = useState('');

  const getUserData = async () => {
    const storedData = await AsyncStorage.getItem(username);
    if (storedData) {
      const userData = JSON.parse(storedData);
      setName(userData.username);
    }
  };

  const init = async () => {
    await getUserData();
  };

  const handleRefresh = () => {
    setRefreshData(!refreshData);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        'https://calendarevents.p.rapidapi.com/calendar/0bce421f557cb8faf40d01fca65b0124896edf6a9d62e87965eba4fe6dcfdc29@group.calendar.google.com/2',
        {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key':
              'e1abb7b6a2msh2dff4d4a19bb26dp11d6d8jsn29b5850b0c65',
            'X-RapidAPI-Host': 'calendarevents.p.rapidapi.com',
          },
        },
      );
      const data = await response.json();
      const habitArray = data.data.items
        .filter(
          item =>
            item.summary.startsWith('Habit') ||
            item.summary.startsWith('habit'),
        )
        .map(item => {
          return {
            name: item.summary,
            date: item.start.dateTime.substring(0, 10),
          };
        });
      setHabitList(habitArray);
    };
    fetchData().then(r => console.log('fetch'));
    init().then(r => console.log('init'));
    returnName().then(r => console.log('returnName'));
  }, [refreshData]);

  const handleCheck = index => {
    setCheckedHabits(prevState => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const countHabits = () => {
    const habitCount = {};
    habitList.forEach(habit => {
      const day = new Date(habit.date).getDay();
      habitCount[day] = (habitCount[day] || 0) + 1;
    });
    return habitCount;
  };

  const habitCount = countHabits();
  const habitChartData = [
    habitCount[1] || 0,
    habitCount[2] || 0,
    habitCount[3] || 0,
    habitCount[4] || 0,
    habitCount[5] || 0,
    habitCount[6] || 0,
    habitCount[0] || 0,
  ];

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const returnName = async () => {
    let tempData = await AsyncStorage.getItem(username);
    const tempUser = JSON.parse(tempData);
    console.log('This is tempName: ' + tempUser.name);
    console.log('This is username: ' + username);
    if (
      tempUser.name !== '' &&
      tempUser.name !== null &&
      tempUser.name !== undefined &&
      tempData !== null
    ) {
      setName(tempUser.name);
      console.log('TempUser setName');
    } else {
      setName(username);
      console.log('username setName');
    }
  };

  return (
    <ScrollView style={themeStyles.container}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require('../../assets/images/diamond.png')}
            style={styles.icon}
          />
          <Text style={[styles.username, themeStyles.text]}>{name}</Text>
          <TouchableOpacity
            onPress={handleRefresh}
            style={[styles.refreshButton, themeStyles.button]}>
            <Text style={[styles.refreshText, themeStyles.buttonText]}>
              Refresh
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={[styles.smallTitles, themeStyles.text]}>
          Habit Calendar:
        </Text>
        <Calendar
          theme={{
            backgroundColor: themeStyles.container.backgroundColor,
            calendarBackground: themeStyles.container.backgroundColor,
            textSectionTitleColor: themeStyles.text.color,
            arrowColor: themeStyles.text.color,
            monthTextColor: themeStyles.text.color,
            dayTextColor: themeStyles.text.color,
          }}
        />
        <View>
          {habitList.map((habit, index) => (
            <View key={index} style={styles.habit}>
              <Text style={themeStyles.text}>
                {habit.name}: {habit.date}
              </Text>
              <RadioButtonItem
                status={checkedHabits[index] ? 'checked' : 'unchecked'}
                onPress={() => handleCheck(index)}
                label=""
                value=""
                color={isDark ? 'white' : 'black'}
              />
            </View>
          ))}
        </View>
        <Text style={[styles.graphTitle, themeStyles.text]}>Habit Graph:</Text>
        <View style={styles.chartContainer}>
          <Svg width={350} height={200}>
            <VictoryChart width={350} height={200}>
              <VictoryAxis
                tickValues={[1, 2, 3, 4, 5, 6, 7]}
                tickFormat={daysOfWeek}
                style={{
                  axis: {stroke: themeStyles.text.color},
                  ticks: {stroke: themeStyles.text.color},
                  tickLabels: {fill: themeStyles.text.color},
                }}
              />
              <VictoryAxis
                dependentAxis
                tickFormat={value => value}
                style={{
                  axis: {stroke: themeStyles.text.color},
                  ticks: {stroke: themeStyles.text.color},
                  tickLabels: {fill: themeStyles.text.color},
                }}
              />
              <VictoryLine
                data={habitChartData.map((count, index) => ({
                  x: daysOfWeek[index],
                  y: count,
                }))}
                style={{
                  data: {
                    stroke: 'rgb(134, 65, 244)',
                    strokeWidth: 2,
                  },
                }}
              />
            </VictoryChart>
          </Svg>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 50,
  },
  flexContainer: {
    flex: 1,
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '88%',
    marginBottom: 20,
  },
  icon: {
    width: 30,
    height: 30,
    backgroundColor: 'white',
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: -180,
  },
  habit: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  chartContainer: {
    flexDirection: 'row',
    height: 200,
    paddingHorizontal: 8,
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  svg: {
    flex: 1,
    marginLeft: 16,
  },
  refreshButton: {
    backgroundColor: 'black',
    borderRadius: 3,
    padding: 10,
  },
  refreshText: {
    color: 'white',
  },
  smallTitles: {
    padding: 10,
    marginBottom: 25,
    marginLeft: 20,
    fontSize: 16,
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  graphTitle: {
    paddingLeft: 10,
    marginTop: 40,
    marginLeft: 20,
    fontSize: 16,
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
});

export default HomeScreen;
