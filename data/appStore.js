import { createStore, combineReducers, applyMiddleware } from 'redux';
import checkinReducer from '../reducers/checkinReducer.js';
import habitReducer from '../reducers/habitReducer.js';

const reducer = combineReducers({
  habitData: habitReducer,
  checkinData: checkinReducer,
});

/**
  Used to generate the app store
  @param  {Object} initialState  The initial state for the store
  @return {Object} A redux store
*/
export default function storeCreator(initialState) {
  return createStore(reducer, initialState);
}
