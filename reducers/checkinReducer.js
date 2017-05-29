/**
@param  {Object}  state  The state prior to reduction
@param  {Object}  action  The reducer action
@return  {Object}  The state after reducer operations
*/
export default function reducer(state = {}, action) {
  switch (action.type) {
    case 'CHECK_IN_HABIT':
      return handleCheckinHabit(state, action);
    default:
      return state;
  }
}

function handleCheckinHabit(state, action) {
  const clonedState = Object.assign({}, state);

  if (!clonedState[action.value.habitName]) {
    clonedState[action.value.habitName] = {
      checkins: []
    };
  }
  clonedState[action.value.habitName].lastCheckinTime = action.value.checkinTime;
  clonedState[action.value.habitName].lastCheckinValue = action.value.checkinValue;
  clonedState[action.value.habitName].checkins.push(action.value);
  return clonedState;
}
