import {Provider} from 'react-redux';
import React from 'react';
import {TabNavigator} from 'react-navigation';
import {AppRegistry, Platform} from 'react-native';
import HomeScreen from './Components/Home';
import HabitPacksScreen from './Components/HabitPacks';
import TrackScreen from './Components/Track';
import CheckinReportScreen from './Components/CheckinReport';
import ListHabitsScreen from './Components/admin/ViewHabits';

import storeGenerator from './redux/storeGenerator';

const store = storeGenerator();

const AppWithNavigationState = TabNavigator({
  'Track': {
    screen: TrackScreen,
    path: '',
  },
  'Get more habits': {
    screen: HabitPacksScreen,
    path: 'packs',
  },
  'See your progress': {
    screen: CheckinReportScreen,
    path: 'checkinreport',
  },
});

const TitanTracker = () => (
  <Provider store={store}>
    <AppWithNavigationState />
  </Provider>
);

AppRegistry.registerComponent('HabitTracker', () => TitanTracker);
