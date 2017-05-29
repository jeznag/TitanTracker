/**
@param  {Object}  state  The state prior to reduction
@param  {Object}  action  The reducer action
@return  {Object}  The state after reducer operations
*/
export default function reducer(state = {}, action) {
  switch (action.type) {
    case 'ADD_OR_EDIT_HABIT':
      return handleAddOrEditHabit(state, action);
    default:
      return state;
  }
}

function handleAddOrEditHabit(state, action) {
  const clonedState = Object.assign({}, state);
  clonedState[action.value.habitName] = action.value;
  return clonedState;
}
