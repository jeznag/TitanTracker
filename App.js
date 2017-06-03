/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import HomeScreen from './Components/Home';
import TrackScreen from './Containers/Tracker';
import ListHabitsScreen from './Components/admin/ViewHabits';
import {
  AppRegistry,
} from 'react-native';

import {
  StackNavigator,
} from 'react-navigation';

const TitanTracker = StackNavigator({
  Home: { screen: HomeScreen },
  Track: { screen: TrackScreen },
  // ListHabits: { screen: ListHabitsScreen }
});

AppRegistry.registerComponent('HabitTracker', () => TitanTracker);
