import { createStore } from 'vuex'

export default createStore({
  state: {
    menuID: '',
    menuName: '',
    parentId:""
  },
  getters: {},
  mutations: {
    setmenuID(state, val) {
      state.menuID = val //state为vuex中的state,val为更改属性的值
    },
    setmenuName(state, val) {
      state.menuName = val //state为vuex中的state,val为更改属性的值
    },
    setmenuParentId(state, val) {
      state.parentId = val //state为vuex中的state,val为更改属性的值
    }
  },
  actions: {},
  modules: {}
})
