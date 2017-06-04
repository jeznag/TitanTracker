import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/mergeMap';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/map';
import * as ActionTypes from '../ActionTypes';
import {saveCheckInAndHabitData} from '../../data/localStorageUtil';

// for testability allowing easy mocking of the API call
const indirect = {
  call: (fn, ...args) => fn(...args),
};

/* Redux observable epic that handles autosaving. Triggered
 * when the user answers one of the questions or closes the modal.
 * Debounced to stop it from DOSing the backend.
 */
export default function autoSave(action$, store, call = indirect.call) {
  return action$.ofType(ActionTypes.CHECK_IN_HABIT).debounceTime(2000).mergeMap(() => {
    const storeState = store.getState();
    const habitData = storeState.habitData;
    const checkinData = storeState.checkinData;
    const saveResponse = Observable.fromPromise(call(saveCheckInAndHabitData, checkinData, habitData));
    return saveResponse
      .map(response => ({
        type: ActionTypes.SAVED_DATA,
        value: response,
      }))
      .catch(error =>
        Observable.of({
          type: ActionTypes.SAVE_FAILED,
          value: error.xhr.response,
          error: true,
        })
      );
  });
}
