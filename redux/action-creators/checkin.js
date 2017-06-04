import * as ActionTypes from '../ActionTypes';

export default {
  checkIn(habit, checkInValue) {
    console.log('checkin in');
    return {
      type: ActionTypes.CHECK_IN_HABIT,
      value: {
        habit,
        checkInValue
      }
    };
  }
};
