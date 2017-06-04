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
    case ActionTypes.ADD_HABIT_PACK:
      return handleAddHabitPack(state, action);
    default:
      return state;
  }
}

function handleAddHabitPack(state, action) {
  const clonedState = state.slice(0);
  if (!clonedState.find((habitPack) => habitPack.packID === action.value.packID)) {
    clonedState.push(action.value);
  }

  return clonedState;
}
