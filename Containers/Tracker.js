import React, {Component} from 'react';
import {Provider} from 'react-redux';
import storeCreator from '../data/appStore';
import TrackComponent from '../Components/Track';
import initialHabitData from '../data/initialData';
import LocalStorageUtil from '../data/localStorageUtil';

async function prepareStore() {
  const habitData = await LocalStorageUtil.loadHabitDataFromStorage();
  const checkinData = await LocalStorageUtil.loadCheckinDataFromStorage();
  const appStore = storeCreator({
    habitData,
    checkinData,
  });
  return appStore;
}

const store = storeCreator({
  habitData: initialHabitData,
  checkinData: [],
});

console.log(store);

export default class TrackContainer extends Component {
  render() {
    // let store;
    // try {
    //   store = await prepareStore();
    // } catch (e) {
    //   console.log(e);
    // }
    // console.log('#$%$#%store', store);
    return (
      <Provider store={store}>
        <TrackComponent habitData={this.props.habitData} />
      </Provider>
    );
  }
}
