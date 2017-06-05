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
  constructor(props) {
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
    if (!this.title) {
      this.title = this.getFunCompletionQuestion(this.props.habit.habitName);
    }
    return (
      <View style={{backgroundColor: this.props.backgroundColor}}>
        <CheckBox
          label={this.title}
          checked={this.props.checked}
          onChange={(value) => {
            this.props.handleCheckin(this.props.habit, !value);
          }}
        />
      </View>
    );
  }
}
