import * as ActionTypes from '../ActionTypes';

export default {
  addOrEditHabit(habitData) {
    return {
      type: ActionTypes.ADD_OR_EDIT_HABIT,
      value: habitData
    };
  },
  addHabitPack(habitPack) {
    console.log('adding habit pack', habitPack);
    return {
      type: ActionTypes.ADD_HABIT_PACK,
      value: habitPack,
    };
  },
};
