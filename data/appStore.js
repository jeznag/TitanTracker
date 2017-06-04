import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import * as asyncInitialState from 'redux-async-initial-state';
import reducers from '../reducers';
import * as LocalStorageUtil from './localStorageUtil';
import initialHabitData from './initialData';

async function loadStore(currentState) {
  console.log('ADFDSF!!');
  try {
    LocalStorageUtil.saveHabitDataInStorage(initialHabitData);
    LocalStorageUtil.saveCheckinDataInStorage([]);
    console.log('Saved');
    const habitData = await LocalStorageUtil.loadHabitDataFromStorage();
    const checkinData = await LocalStorageUtil.loadCheckinDataFromStorage();
    console.log('sdfsdf', habitData, 'chec', checkinData);
    return {
      ...currentState,
      habitData,
      checkinData
    };
  } catch (e) {
    console.log(e);
  }
}

console.log('reducers', reducers);
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
    compose(applyMiddleware(asyncInitialState.middleware(loadStore)))
  );
}
