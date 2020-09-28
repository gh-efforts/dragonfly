import * as Vuex from 'vuex';
import globalModule from './global';
import createLogger from 'vuex/dist/logger';

const debug = process.env.NODE_ENV !== 'production';

export default Vuex.createStore({
  modules: {
    global: globalModule
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
});
