import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.js$/)

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
// https://blog.csdn.net/ykh12345678/article/details/124871203
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  // console.log(value.default)
  if(value.default !== undefined){
    modules[moduleName] = value.default
  }
  return modules
}, {})

export default new Vuex.Store({
  //类似data 存放状态
  state: {
    toolbar: {
      visible: false,
      enter: true
    },
    sortInfo: [],
    // currentUser: {},
    currentAdmin: {},
    webInfo: {
      webName: "",
      webTitle: [],
      notices: [],
      footer: "",
      backgroundImage: "",
      avatar: ""
    }
  },
  //类似compute state的计算属性
  getters,
  //同步操作 类似method 更改state中状态的逻辑
  mutations: {
    changeToolbarStatus(state, toolbarState) {
      state.toolbar = toolbarState;
    },
    loadSortInfo(state, sortInfo) {
      if (sortInfo !== null && sortInfo.length !== 0) {
        state.sortInfo = sortInfo.sort((s1, s2) => s1.priority - s2.priority);
      }
    },
    // loadCurrentUser(state, user) {
    //   state.currentUser = user;
    // },
    // loadCurrentAdmin(state, user) {
    //   state.currentAdmin = user;
    // },
    loadWebInfo(state, webInfo) {
      webInfo.webTitle = webInfo.webTitle.split('');
      webInfo.notices = JSON.parse(webInfo.notices);
      state.webInfo = webInfo;
    }
  },
  //异步操作 类似method 可以通过store.dispatch()触发
  //通过commit()方法触发mutations 提交mutation
  actions: {},
  //如果将store分成一个个的模块的话，则需要用到modules。
  //然后在每一个module中写state, getters, mutations, actions等
  modules,
  plugins: [
    createPersistedState({
      storage: window.localStorage
    })
  ]
})
