import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/filter';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/map';
import {ajax} from 'rxjs/observable/dom/ajax';
import * as ActionTypes from '../ActionTypes';

/*
 * Redux observable epic that gets the available habit packs from the server
 */
export default function getHabitPacksFromServer(
  action$,
  store
) {
  return action$
    .ofType('redux-async-initial-state/STATE_LOADING_DONE')
    .mergeMap(action => {
      return ajax
        .getJSON('https://titantracker.herokuapp.com/habitPacks')
        .map(response => ({
          type: ActionTypes.UPDATE_AVAILABLE_HABIT_PACKS,
          value: response,
        }));
    });
}
