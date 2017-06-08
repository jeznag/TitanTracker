import React, {Component} from 'react';
import {StyleSheet, Text, Button, View} from 'react-native';
import {connect} from 'react-redux';
import {getDaysSince} from '../utils/timeCalculations';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  track: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

class CheckinReport extends Component {
  constructor() {
    super();
    this.filterHabits = this.filterHabits.bind(this);
    this.weakHabits = this.weakHabits.bind(this);
    this.newHabits = this.newHabits.bind(this);
    this.firmHabits = this.firmHabits.bind(this);
  }

  filterHabits(
    minPercentAdherence,
    maxPercentAdherence,
    title,
    backgroundColor
  ) {
    const habitsInThisCategory = Object.keys(
      this.props.checkinData
    ).reduce((filteredHabits, habitID) => {
      const checkInDataForThisHabit = this.props.checkinData[habitID];
      const totalCheckins = checkInDataForThisHabit.checkins.length;
      const daysElapsed = Math.ceil(getDaysSince(checkInDataForThisHabit.habitStarted));
      const percentAdherence = totalCheckins / daysElapsed * 100;
      const habitName = this.props.habitData.find(
        habit => habit.habitID === habitID
      ).habitName;

      if (
        percentAdherence >= minPercentAdherence &&
        percentAdherence < maxPercentAdherence
      ) {
        filteredHabits.push({
          habitID,
          percentAdherence,
          habitName,
        });
      }
      return filteredHabits;
    }, []);

    if (!habitsInThisCategory.length)
      return;

    return (
      <View style={{backgroundColor}}>
        <Text style={{textAlign: 'center', fontWeight: 'bold'}}>{title}</Text>
        <View>
          {habitsInThisCategory.map(habitSummary => (
            <Text style={{textAlign: 'center'}} key={habitSummary.habitID}>
              {habitSummary.habitName} - {habitSummary.percentAdherence}%
            </Text>
          ))}
        </View>
      </View>
    );
  }

  weakHabits() {
    return this.filterHabits(0, 10, 'Weak Habits', 'red');
  }

  newHabits() {
    return this.filterHabits(10, 50, 'New Habits', 'orange');
  }

  firmHabits() {
    return this.filterHabits(50, 101, 'Strong Habits', 'green');
  }

  render() {
    const {navigate} = this.props.navigation;
    if (this.props.loading) {
      return <Text>Loading...</Text>;
    }
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Progress report
        </Text>
        {this.weakHabits()}
        {this.newHabits()}
        {this.firmHabits()}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    checkinData: state.checkinData,
    habitData: state.habitData,
    loading: state.asyncInitialState.loading,
  };
};

export default connect(mapStateToProps)(CheckinReport);
