import mutations from './mutations';
import * as constants from './constants';

export const state = {
  count: 0
};

export default {
  namespaced: true,
  state,
  mutations,
  constants
};
