export default {
  checkin(checkinData) {
    return {
      type: 'CHECK_IN_HABIT',
      value: checkinData
    };
  }
};
