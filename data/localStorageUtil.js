import {AsyncStorage} from 'react-native';
import Storage from 'react-native-storage';

const relevantStorageMethod = !!window ? window.localStorage : AsyncStorage;
const storage = new Storage({
  storageBackend: relevantStorageMethod,

  // expire time, default 1 day(1000 * 3600 * 24 milliseconds).
  // can be null, which means never expire.
  defaultExpires: null,

  // if data was not found in storage or expired,
  // the corresponding sync method will be invoked and return
  // the latest data.
  sync: {
    // we'll talk about the details later.
  },
});

const KEY_FOR_HABIT_DATA = 'TitanTrackerHabitData';
const KEY_FOR_HABIT_PACK_DATA = 'TitanTrackerHabitPackData';
const KEY_FOR_CHECKIN_DATA = 'TitanTrackerCheckinData';

export async function loadHabitDataFromStorage() {
  try {
    const data = await storage.load({
      key: KEY_FOR_HABIT_DATA,
    });
    return data;
  } catch (e) {
    saveHabitDataInStorage([]);
    return [];
  }
}

export async function loadHabitPackDataFromStorage() {
  try {
    const data = await storage.load({
      key: KEY_FOR_HABIT_PACK_DATA,
    });
    return data;
  } catch (e) {
    saveHabitPackDataInStorage([]);
    return [];
  }
}

export async function loadCheckinDataFromStorage() {
  try {
    const data = await storage.load({
      key: KEY_FOR_CHECKIN_DATA,
    });
    return data;
  } catch (e) {
    saveCheckinDataInStorage([]);
    return [];
  }
}

async function saveHabitDataInStorage(newData) {
  await storage.save({
    key: KEY_FOR_HABIT_DATA,
    data: newData,
  });
}

async function saveHabitPackDataInStorage(newData) {
  await storage.save({
    key: KEY_FOR_HABIT_PACK_DATA,
    data: newData,
  });
}

async function saveCheckinDataInStorage(newData) {
  await storage.save({
    key: KEY_FOR_CHECKIN_DATA,
    data: newData,
  });
}

export async function saveCheckInAndHabitData(
  checkinData,
  habitData,
  habitPackData
) {
  await saveCheckinDataInStorage(checkinData);
  await saveHabitDataInStorage(habitData);
  await saveHabitPackDataInStorage(habitPackData);
}
