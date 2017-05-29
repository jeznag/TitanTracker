export default {
  addOrEditHabit(habitData) {
    return {
      type: 'ADD_OR_EDIT_HABIT',
      value: habitData
    };
  }
};
