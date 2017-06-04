import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Button,
  View
} from 'react-native';
import Slider from 'react-native-slider';

export default class NumberInput extends Component {
  render() {
    return (
      <View>
        <Text>{this.props.habit.habitName} - how many {this.props.habit.units} did you do?</Text>
        <Slider
          step={1}
          maximumValue={this.props.habit.valueForMaxScore}
          value={this.props.value}
          onValueChange={(value) => {
            this.props.handleCheckin(this.props.habit, value);
          }}
          style={{ marginLeft: 0, marginRight: 30 }}
        />
        <Text>{this.props.value}</Text>
      </View>
    );
  }
}
