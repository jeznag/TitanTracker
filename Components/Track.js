import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView
} from 'react-native';
import {connect} from 'react-redux';
import Accordion from 'react-native-collapsible/Accordion';
import NumberInput from './inputs/Number';
import BooleanInput from './inputs/Boolean';

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

const timeBlocks = ['morning', 'midday', 'afternoon', 'evening'];

function getHabitsForTimeBlock(habitData, timeBlock) {
  console.log('getHabitsForTimeBlock', habitData);
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
      <BooleanInput
        habit={habit}
      />
    );
  }
}

function renderHeader(habitData, timeBlock) {
  console.log('renderHeader', habitData);
  const habitsForThisTimeBlock = getHabitsForTimeBlock(habitData, timeBlock);
  const completedHabits = 0;
  const heading = `${timeBlock} (${completedHabits} / ${habitsForThisTimeBlock.length})`;
  return (<View style={styles.header}>
    <Text style={styles.headerText}>{heading}</Text>
  </View>);
}

function renderAccordionContent(habitData, timeBlock) {
  console.log('renderAccordionContent', habitData);
  const habitsForThisTimeBlock = getHabitsForTimeBlock(habitData, timeBlock);
  const ds = new ListView.DataSource({rowHasChanged: () => false});
  const data = ds.cloneWithRows(habitsForThisTimeBlock);
  return (<ListView
    dataSource={data}
    renderRow={getHabitComponent}
  />);
}

function getTimeBlocks(habitData) {
  console.log('getTimeBlocks', habitData);
  return (<Accordion
    sections={timeBlocks}
    renderHeader={renderHeader.bind(null, habitData)}
    renderContent={renderAccordionContent.bind(null, habitData)}
    enableEmptySections={false}
  />);
}

class TrackScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        {getTimeBlocks(this.props.habitData)}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    habitData: state.habitData,
  };
};

export default connect(mapStateToProps)(TrackScreen);
