import * as ActionTypes from '../ActionTypes';

/**
@param  {Object}  state  The state prior to reduction
@param  {Object}  action  The reducer action
@return  {Object}  The state after reducer operations
*/
export default function reducer(state = [], action) {
  if (!action) {
    return state;
  }
  switch (action.type) {
    case ActionTypes.ADD_OR_EDIT_HABIT:
      return handleAddOrEditHabit(state, action);
    case ActionTypes.CHECK_IN_HABIT:
      return handleCheckinHabit(state, action);
    default:
      return state;
  }
}

function handleAddOrEditHabit(state, action) {
  const clonedState = state.slice(0);
  clonedState.push(action.value);
  return clonedState;
}

function handleCheckinHabit(state, action) {
  const clonedState = state.slice(0);
  const relevantHabit = clonedState.find((habit) => habit.habitID === action.value.habit.habitID);
  if (relevantHabit.valueForMaxScore === action.value.checkInValue) {
    relevantHabit.lastCheckin = new Date();
  }
  return clonedState;
}
