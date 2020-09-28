import * as Vuex from 'vuex'
import modules from './modules'
import createPersistedState from 'vuex-persistedstate'

const debug = process.env.NODE_ENV !== 'production'

export default Vuex.createStore({
  modules,
  strict: debug,
  plugins: [createPersistedState({ storage: window.localStorage })]
})
