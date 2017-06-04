import {Provider} from 'react-redux';
import React from 'react';
import {StackNavigator} from 'react-navigation';
import {AppRegistry} from 'react-native';
import HomeScreen from './Components/Home';
import TrackScreen from './Components/Track';
import ListHabitsScreen from './Components/admin/ViewHabits';

import storeGenerator from './redux/storeGenerator';

const store = storeGenerator();

const AppWithNavigationState = StackNavigator({
  Track: {screen: TrackScreen},
  // ListHabits: { screen: ListHabitsScreen }
});

const TitanTracker = () => (
  <Provider store={store}>
    <AppWithNavigationState />
  </Provider>
);

AppRegistry.registerComponent('HabitTracker', () => TitanTracker);
