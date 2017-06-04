import React, {Component} from 'react';
import {StyleSheet, Text, View, ListView} from 'react-native';
import {connect} from 'react-redux';
import Accordion from 'react-native-collapsible/Accordion';
import NumberInput from './inputs/Number';
import BooleanInput from './inputs/Boolean';
import CheckInActionCreator from '../redux/action-creators/checkin';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  accordionContent: {
    paddingLeft: 20,
  },
  headerText: {
    fontSize: 20,
    margin: 10,
  },
  consistentCheckin: {
    backgroundColor: 'green'
  },
  somewhatInconsistentCheckin: {
    backgroundColor: 'orange'
  },
  reallyInconsistentCheckin: {
    backgroundColor: 'red'
  },
});

const timeBlocks = ['morning', 'midday', 'afternoon', 'evening'];

function getHabitsForTimeBlock(habitData, timeBlock) {
  return habitData.filter(habit => habit.timeBlock === timeBlock);
}

function getHabitComponents(habits) {
  return habits.map(getHabitComponent);
}

function getHabitComponent(handleCheckin, habit) {
  if (habit.type === 'number') {
    return (
      <NumberInput
        habit={habit}
        handleCheckin={handleCheckin}
        key={habit.habitID}
        style={getBackgroundColourForHabits([habit])}
      />
    );
  } else if (habit.type === 'boolean') {
    return (
      <BooleanInput
        key={habit.habitID}
        habit={habit}
        handleCheckin={handleCheckin}
        style={getBackgroundColourForHabits([habit])}
      />
    );
  }
}

function getBackgroundColourForHabits(habits) {
  const consistentCheckinStyle = styles.consistentCheckin;
  const somewhatInconsistentCheckinStyle = styles.inconsistentCheckin;

  const DAY_LENGTH = 24 * 60 * 60 * 1000;
  const totalDaysSinceGoodCheckin = habits.reduce((totalDays, habit) => {
    const daysSinceGoodCheckin = (new Date() - new Date(habit.lastCheckin)) / DAY_LENGTH;
    return totalDays + daysSinceGoodCheckin;
  }, 0);

  if (totalDaysSinceGoodCheckin === 0) {
    return null;
  } else if (totalDaysSinceGoodCheckin < 1) {
    return styles.consistentCheckin;
  } else if (totalDaysSinceGoodCheckin < 5) {
    return styles.somewhatInconsistentCheckin;
  } else {
    return styles.reallyInconsistentCheckin;
  }
}

function renderHeader(habitData, timeBlock) {
  const habitsForThisTimeBlock = getHabitsForTimeBlock(habitData, timeBlock);
  const completedHabits = 0;
  const heading = `${timeBlock} (${completedHabits} / ${habitsForThisTimeBlock.length})`;
  return (
    <View style={[styles.header, getBackgroundColourForHabits(habitsForThisTimeBlock)]}>
      <Text style={styles.headerText}>{heading}</Text>
    </View>
  );
}

function renderAccordionContent(habitData, handleCheckin, timeBlock) {
  const habitsForThisTimeBlock = getHabitsForTimeBlock(habitData, timeBlock);
  return (
    <View style={styles.header}>
      {habitsForThisTimeBlock.map(getHabitComponent.bind(null, handleCheckin))}
    </View>
  );
}

function getTimeBlocks(habitData, handleCheckin) {
  return (
    <Accordion
      sections={timeBlocks}
      renderHeader={renderHeader.bind(null, habitData)}
      renderContent={renderAccordionContent.bind(
        null,
        habitData,
        handleCheckin
      )}
    />
  );
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

const mapDispatchToProps = dispatch => {
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
