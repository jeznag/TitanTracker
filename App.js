/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import HomeScreen from './Components/Home';
import TrackScreen from './Components/Track';
import ListHabitsScreen from './Components/admin/ViewHabits';
import {
  AppRegistry,
} from 'react-native';

import {
  StackNavigator,
} from 'react-navigation';

import createStore from './data/appStorage';
import LocalStorageUtil from './data/localStorageUtil';

async function setup() {
  const habitData = await LocalStorageUtil.loadHabitDataFromStorage();
  const checkinData = await LocalStorageUtil.loadCheckinDataFromStorage();
  const appStore = createStore({
    habitData,
    checkinData,
  });

  const TitanTracker = StackNavigator({
    Home: { screen: HomeScreen },
    Track: { screen: TrackScreen },
    ListHabits: { screen: ListHabitsScreen }
  });

  AppRegistry.registerComponent('HabitTracker', () => TitanTracker);
}

setup();
