import {Provider} from 'react-redux';
import React from 'react';
import {TabNavigator} from 'react-navigation';
import {AppRegistry, Platform} from 'react-native';
import HomeScreen from './Components/Home';
import HabitPacksScreen from './Components/HabitPacks';
import TrackScreen from './Components/Track';
import ListHabitsScreen from './Components/admin/ViewHabits';

import storeGenerator from './redux/storeGenerator';

const store = storeGenerator();

const AppWithNavigationState = TabNavigator({
  Track: {
    screen: TrackScreen,
    path: '',
  },
  HabitPacks: {
    screen: HabitPacksScreen,
    path: 'packs',
  },
});

const TitanTracker = () => (
  <Provider store={store}>
    <AppWithNavigationState />
  </Provider>
);

AppRegistry.registerComponent('HabitTracker', () => TitanTracker);
