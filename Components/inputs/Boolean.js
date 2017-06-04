import CheckBox from 'react-native-checkbox'
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Button,
  View
} from 'react-native';

export default class BooleanInput extends Component {
  constructor() {
    super();
    this.state = {
      value: false,
    };
  }

  getFunCompletionQuestion(habitName) {
    const wasItDoneOptions = [
      'did you smash this one out today?',
      'were you victorious today?',
      'did you fight your demons today?',
      'did you hit it out of the park?',
      'should I smile or cry?',
      'another one bites the dust?'
    ];

    const randomIndex = Math.floor(Math.random() * wasItDoneOptions.length);
    const wasItDoneQuestion = wasItDoneOptions[randomIndex];
    return `${this.props.habit.habitName} - ${wasItDoneQuestion}`;
  }

  render() {
    return (
      <View>
        <CheckBox
          checked={this.state.value}
          label={this.getFunCompletionQuestion(this.props.habit.habitName)}
          onChange={(value) => {
            this.setState({
              value: !value
            });
            this.props.handleCheckin(this.props.habit, value);
          }}
        />
      </View>
    );
  }
}
