export function getDaysSince(dateToCompare) {
  const DAY_LENGTH = 24 * 60 * 60 * 1000;
  const timeSinceCompareDate = new Date() - new Date(dateToCompare);
  const daysSinceCompare = timeSinceCompareDate / DAY_LENGTH;
  if (isNaN(daysSinceCompare)) {
    return Infinity;
  }
  return daysSinceCompare;
}

export const timeBlocks = ['morning', 'midday', 'afternoon', 'evening'];

export function getRelevantTimeBlockIndexForCurrentTime() {
  const currentHour = new Date().getHours();

  if (currentHour < 12) {
    return 0;
  } else if (currentHour < 15) {
    return 1;
  } else if (currentHour < 18) {
    return 2;
  } else {
    return 3;
  }
}
