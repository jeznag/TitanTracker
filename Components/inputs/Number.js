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
  constructor() {
    super();
    this.state = {
      value: 0,
    };
  }

  render() {
    return (
      <View>
        <Text>{this.props.habit.habitName} - how many {this.props.habit.units} did you do?</Text>
        <Slider
          value={this.state.value}
          step={1}
          maximumValue={this.props.habit.valueForMaxScore}
          onValueChange={(value) => {
            this.setState({
              value
            });
            console.log('CHANGED!!', value);
          }}
        />
        <Text>{this.state.value}</Text>
      </View>
    );
  }
}
