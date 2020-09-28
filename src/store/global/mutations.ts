import * as actionTypes from './constants';
import { state as defaultState } from './index';

export default {
  [actionTypes.ADD_COUNT](state: typeof defaultState) {
    state.count += 1;
  }
};
