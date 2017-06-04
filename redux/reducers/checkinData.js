import * as ActionTypes from '../ActionTypes';

/**
@param  {Object}  state  The state prior to reduction
@param  {Object}  action  The reducer action
@return  {Object}  The state after reducer operations
*/
export default function reducer(state = {}, action) {
  if (!action) {
    return state;
  }
  switch (action.type) {
    case ActionTypes.CHECK_IN_HABIT:
      return handleCheckinHabit(state, action);
    default:
      return state;
  }
}

function handleCheckinHabit(state, action) {
  const clonedState = Object.assign({}, state);

  if (!clonedState[action.value.habit.habitID]) {
    clonedState[action.value.habit.habitID] = {
      checkins: []
    };
  }
  clonedState[action.value.habit.habitID].checkins.push({
    value: action.value.checkInValue,
    time: new Date(),
  });
  return clonedState;
}
