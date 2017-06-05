import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import * as asyncInitialState from 'redux-async-initial-state';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import reducers from './reducers';
import autoSaveEpic from './epics/autosave';
import loadAvailableHabitPacksEpic from './epics/loadAvailableHabitPacks';
import * as LocalStorageUtil from '../data/localStorageUtil';

async function loadStore(currentState) {
  try {
    const habitData = await LocalStorageUtil.loadHabitDataFromStorage();
    const checkinData = await LocalStorageUtil.loadCheckinDataFromStorage();
    const storedHabitPackData = await LocalStorageUtil.loadHabitPackDataFromStorage();

    return {
      ...currentState,
      habitData,
      checkinData,
      habitPackData: storedHabitPackData,
    };
  } catch (e) {
    console.log(e);
  }
}

const rootEpic = combineEpics(
  autoSaveEpic,
  loadAvailableHabitPacksEpic
);
const epicMiddleware = createEpicMiddleware(rootEpic);

// We need outerReducer to replace full state as soon as it loaded
const reducer = asyncInitialState.outerReducer(combineReducers({
  ...reducers,
  // We need innerReducer to store loading state, i.e. for showing loading spinner
  // If you don't need to handle loading state you may skip it
  asyncInitialState: asyncInitialState.innerReducer,
}));

/**
  Used to generate the app store
  @param  {Object} initialState  The initial state for the store
  @return {Object} A redux store
*/
export default function storeCreator() {
  return createStore(
    reducer,
    compose(applyMiddleware(asyncInitialState.middleware(loadStore), epicMiddleware))
  );
}
