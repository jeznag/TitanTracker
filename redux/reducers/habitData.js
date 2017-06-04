import * as ActionTypes from '../ActionTypes';
import { getDaysSince } from '../../utils/timeCalculations';

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
    case ActionTypes.ADD_HABIT_PACK:
      return handleAddHabitPack(state, action);
    default:
      return state;
  }
}

function handleAddHabitPack(state, action) {
  const clonedState = state.slice(0);
  const newHabitsToAdd = action.value.habits;
  newHabitsToAdd.forEach((newHabit) => {
    if (!clonedState.find((habit) => habit.habitID === newHabit.habitID)) {
      clonedState.push(newHabit);
    }
  });
  return clonedState;
}

function handleAddOrEditHabit(state, action) {
  const clonedState = state.slice(0);
  clonedState.push(action.value);
  return clonedState;
}

function handleCheckinHabit(state, action) {
  const clonedState = state.slice(0);
  const relevantHabit = clonedState.find((habit) => habit.habitID === action.value.habit.habitID);
  const daysSinceLastCheckin = getDaysSince(relevantHabit.lastCheckin);
  if (daysSinceLastCheckin > 1) {
    relevantHabit.lastCheckin = new Date();
  }
  relevantHabit.lastCheckinValue = action.value.checkInValue;
  return clonedState;
}
