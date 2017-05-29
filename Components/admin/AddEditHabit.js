import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Input,
  Button,
  View
} from 'react-native';

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

export default class AddEditHabit extends Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Add/Edit Habit
        </Text>
        <Input value={this.props.habitName} label="Habit Name"/>
        <Select value={this.props.type} label="Type" options={
          ['Yes/No', 'Number']
        }/>
        <Select value={this.props.timeBlock} label="Time Block" options={
          ['Morning', 'Midday', 'Afternoon', 'Evening']
        }/>
        <Input value={this.props.maxScore} label="Maximum Score"/>
        <Input value={this.props.valueForMaxScore} label="Value to get max score"/>
        <Button
          onPress={() => navigate('Track')}
          title="Save Habit"
        />
      </View>
    );
  }
}
