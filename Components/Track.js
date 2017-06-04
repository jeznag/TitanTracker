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
import CheckInActionCreator from '../redux/action-creators/checkin';

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
  return habitData.filter((habit) => habit.timeBlock === timeBlock);
}

function getHabitComponents(habits) {
  return habits.map(getHabitComponent);
}

function getHabitComponent(handleCheckin, habit) {
  if (habit.type === 'number') {
    return (
      <NumberInput habit={habit} handleCheckin={handleCheckin} />
    );
  } else if (habit.type === 'boolean') {
    return (
      <BooleanInput
        habit={habit}
        handleCheckin={handleCheckin}
      />
    );
  }
}

function renderHeader(habitData, timeBlock) {
  const habitsForThisTimeBlock = getHabitsForTimeBlock(habitData, timeBlock);
  const completedHabits = 0;
  const heading = `${timeBlock} (${completedHabits} / ${habitsForThisTimeBlock.length})`;
  return (<View style={styles.header}>
    <Text style={styles.headerText}>{heading}</Text>
  </View>);
}

function renderAccordionContent(habitData, handleCheckin, timeBlock) {
  const habitsForThisTimeBlock = getHabitsForTimeBlock(habitData, timeBlock);
  const ds = new ListView.DataSource({rowHasChanged: () => false});
  const data = ds.cloneWithRows(habitsForThisTimeBlock);
  return (<ListView
    dataSource={data}
    enableEmptySections={true}
    renderRow={getHabitComponent.bind(null, handleCheckin)}
  />);
}

function getTimeBlocks(habitData, handleCheckin) {
  return (<Accordion
    sections={timeBlocks}
    renderHeader={renderHeader.bind(null, habitData)}
    renderContent={renderAccordionContent.bind(null, habitData, handleCheckin)}
  />);
}

class TrackScreen extends Component {
  render() {
    if (this.props.loading) {
      return (<Text>Loading...</Text>);
    }
    return (
      <View style={styles.container}>
        {getTimeBlocks(this.props.habitData, this.props.handleCheckin)}
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleCheckin(habit, value) {
      dispatch(CheckInActionCreator.checkIn(habit, value));
    },
  };
};

const mapStateToProps = state => {
  return {
    habitData: state.habitData,
    loading: state.asyncInitialState.loading,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackScreen);
