import 'regenerator-runtime/runtime';
import {Provider} from 'react-redux';
import React from 'react';
import {AppRegistry, Platform} from 'react-native';
import NavWrapper from './NavWrapper';

import storeGenerator from './redux/storeGenerator';

const store = storeGenerator();

const TitanTracker = () => (
  <Provider store={store}>
    <NavWrapper currentRoute="Track" />
  </Provider>
);

AppRegistry.registerComponent('HabitTracker', () => TitanTracker);
AppRegistry.runApplication('HabitTracker', {
  rootTag: document.getElementById('react-root'),
});
