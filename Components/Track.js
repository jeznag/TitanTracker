import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView
} from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import CheckBox from 'react-native-checkbox';
import NumberInput from './inputs/Number';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

const habitData = [
  {
    habitName: 'Meditate',
    type: 'number',
    units: 'minutes',
    maxScore: 30,
    valueForMaxScore: 30,
    timeBlock: 'morning',
    completions: [
      {
        date: new Date('12/5/2017'),
        value: true
      }
    ]
  },
  {
    habitName: 'Do Hello Chinese',
    type: 'boolean',
    maxScore: 10,
    valueForMaxScore: true,
    timeBlock: 'evening',
    completions: [
      {
        date: new Date('12/5/2017'),
        value: true
      }
    ]
  }
];

const timeBlocks = ['morning', 'midday', 'afternoon', 'evening'];

function getHabitsForTimeBlock(timeBlock) {
  return habitData.filter((habit) => habit.timeBlock === timeBlock);
}

function getHabitComponents(habits) {
  return habits.map(getHabitComponent);
}

function getHabitComponent(habit) {
  if (habit.type === 'number') {
    return (
      <NumberInput habit={habit} />
    );
  } else if (habit.type === 'boolean') {
    return (
      <CheckBox
        label={habit.habitName}
        checked={false}
      />
    );
  }
}

function renderHeader(timeBlock) {
  const habitsForThisTimeBlock = getHabitsForTimeBlock(timeBlock);
  const completedHabits = 0;
  const heading = `${timeBlock} (${completedHabits} / ${habitsForThisTimeBlock.length})`;
  return (<View style={styles.header}>
    <Text style={styles.headerText}>{heading}</Text>
  </View>);
}

function renderAccordionContent(timeBlock) {
  const habitsForThisTimeBlock = getHabitsForTimeBlock(timeBlock);
  const ds = new ListView.DataSource({rowHasChanged: () => false});
  const data = ds.cloneWithRows(habitsForThisTimeBlock);
  return (<ListView
    dataSource={data}
    renderRow={getHabitComponent}
  />);
}

function getTimeBlocks() {
  return (<Accordion
    sections={timeBlocks}
    renderHeader={renderHeader}
    renderContent={renderAccordionContent}
  />);
}

export default class TrackScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        {getTimeBlocks()}
      </View>
    );
  }
}
