import React, {Component} from 'react';
import {StyleSheet, Text, Button, View} from 'react-native';
import {connect} from 'react-redux';
import Accordion from 'react-native-collapsible/Accordion';
import NumberInput from './inputs/Number';
import BooleanInput from './inputs/Boolean';
import CheckInActionCreator from '../redux/action-creators/checkin';
import { getDaysSince, timeBlocks, getRelevantTimeBlockIndexForCurrentTime } from '../utils/timeCalculations';

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
  screenTitle: {
    marginLeft: -25,
    fontSize: 22,
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

let lastBackgroundColourUpdate = {};

function getHabitsForTimeBlock(habitData, timeBlock) {
  return habitData.filter(habit => habit.timeBlock === timeBlock);
}

function getNumHabitsCompleted(habitsForThisTimeBlock) {
  return habitsForThisTimeBlock.reduce((totalCorrect, habit) => {
    return totalCorrect + (habit.valueForMaxScore === habit.lastCheckinValue);
  }, 0);
}

function getBackgroundColourForHabits(habits, timeBlock) {
  if (lastBackgroundColourUpdate[timeBlock] && (new Date() - lastBackgroundColourUpdate[timeBlock].lastTime) < 500) {
    return lastBackgroundColourUpdate[timeBlock].lastStyle;
  }

  const totalDaysSinceGoodCheckin = habits.reduce((totalDays, habit) => {
    const isMaxValue = habit.lastCheckinValue === habit.valueForMaxScore;
    const daysSinceGoodCheckin = getDaysSince(habit.lastCheckin);
    if (daysSinceGoodCheckin === Infinity || !isMaxValue) {
      return totalDays + 2;
    }
    return totalDays + daysSinceGoodCheckin;
  }, 0);

  lastBackgroundColourUpdate[timeBlock] = {
    lastTime: new Date(),
  };

  if (totalDaysSinceGoodCheckin === 0) {
    lastBackgroundColourUpdate[timeBlock].lastStyle = null;
  } else if (totalDaysSinceGoodCheckin < 1) {
    lastBackgroundColourUpdate[timeBlock].lastStyle = styles.consistentCheckin;
  } else if (totalDaysSinceGoodCheckin < 5) {
    lastBackgroundColourUpdate[timeBlock].lastStyle = styles.somewhatInconsistentCheckin;
  } else {
    lastBackgroundColourUpdate[timeBlock].lastStyle = styles.reallyInconsistentCheckin;
  }
  return lastBackgroundColourUpdate[timeBlock].lastStyle;
}

class TrackScreen extends Component {

  constructor() {
    super();
    this.getHabitComponent = this.getHabitComponent.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
    this.renderAccordionContent = this.renderAccordionContent.bind(this);
    this.getTimeBlocks = this.getTimeBlocks.bind(this);
  }

  getHabitComponent(habit) {
    const daysSinceLastCheckin = getDaysSince(habit.lastCheckin);
    let valueToSet = habit.lastCheckinValue;
    if (daysSinceLastCheckin > 1) {
      valueToSet = null;
    }
    if (habit.type === 'number') {
      return (
        <NumberInput
          habit={habit}
          handleCheckin={this.props.handleCheckin}
          key={habit.habitID}
          value={valueToSet}
        />
      );
    } else if (habit.type === 'boolean') {
      return (
        <BooleanInput
          key={habit.habitID}
          checked={valueToSet}
          habit={habit}
          handleCheckin={this.props.handleCheckin}
        />
      );
    }
  }

  renderHeader(timeBlock) {
    const habitsForThisTimeBlock = getHabitsForTimeBlock(this.props.habitData, timeBlock);
    const completedHabits = getNumHabitsCompleted(habitsForThisTimeBlock);
    const heading = `${timeBlock} (${completedHabits} / ${habitsForThisTimeBlock.length})`;
    return (
      <View style={[styles.header, getBackgroundColourForHabits(habitsForThisTimeBlock, timeBlock)]}>
        <Text style={styles.headerText}>{heading}</Text>
      </View>
    );
  }

  renderAccordionContent(timeBlock) {
    const habitsForThisTimeBlock = getHabitsForTimeBlock(this.props.habitData, timeBlock);
    return (
      <View style={styles.header}>
        {habitsForThisTimeBlock.map(this.getHabitComponent)}
      </View>
    );
  }

  getTimeBlocks() {
    return (
      <Accordion
        sections={timeBlocks}
        initiallyActiveSection={getRelevantTimeBlockIndexForCurrentTime()}
        renderHeader={this.renderHeader}
        underlayColor="#fff"
        renderContent={this.renderAccordionContent}
      />
    );
  }

  render() {
    const { navigate } = this.props.navigation;
    if (this.props.loading) {
      return (<Text>Loading...</Text>);
    }
    return (
      <View style={styles.container}>
        <Text style={styles.screenTitle}>
          Titan Tracker - track your habits
        </Text>
        {this.getTimeBlocks()}
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
    checkinData: state.checkinData,
    loading: state.asyncInitialState.loading,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackScreen);
