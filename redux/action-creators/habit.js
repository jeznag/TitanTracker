import * as ActionTypes from '../ActionTypes';

export default {
  addOrEditHabit(habitData) {
    return {
      type: ActionTypes.ADD_OR_EDIT_HABIT,
      value: habitData
    };
  }
};
