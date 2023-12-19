import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-persistedstate-plugin'
const store = createPinia()
//全局持久化
store.use(createPersistedState())
export default store
