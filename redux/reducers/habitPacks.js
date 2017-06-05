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
    case ActionTypes.ADD_HABIT_PACK:
      return handleAddHabitPack(state, action);
    case ActionTypes.UPDATE_AVAILABLE_HABIT_PACKS:
      return handleUpdateAvailableHabitPacks(state, action);
    default:
      return state;
  }
}

function handleUpdateAvailableHabitPacks(state, action) {
  const clonedState = Object.assign({}, state);
  clonedState.availableHabitPacks = action.value;
  return clonedState;
}

function handleAddHabitPack(state, action) {
  const clonedState = Object.assign({}, state);
  const installedHabitPacks = clonedState.installedHabitPacks;
  if (!installedHabitPacks.find((habitPack) => habitPack.packID === action.value.packID)) {
    installedHabitPacks.push(action.value);
  }

  return clonedState;
}
