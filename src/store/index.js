import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'
import tasks from './tasks'
import user from './user'
import note from './notes'

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      // example
      tasks,
      user,
      note
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING
  })

  return Store
})
