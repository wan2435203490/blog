import { login, logout, getInfo, refreshToken } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'
import storage from '@/utils/storage'
import store from "@/store";

//state.user.token...
const state = {
  token: getToken(),
  current:{},
  name: '',
  avatar: '',
  introduction: '',
  role:{},
  //roles: [],
  // permissions: [],
  // permisaction: []
}

const mutations = {
  SET_USER: (state, user) => {
    state.current = user
  },
  SET_ROLE: (state, role) => {
    state.role = role
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    if (avatar.indexOf('http') !== -1) {
      state.avatar = avatar
    } else {
      state.avatar = process.env.BASE_URL + avatar
    }
  },
  // SET_ROLES: (state, roles) => {
  //   state.roles = roles
  // },
  // SET_PERMISSIONS: (state, permisaction) => {
  //   state.permisaction = permisaction
  // }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      login(userInfo).then(response => {
        const { token } = response
        commit('SET_TOKEN', token)
        setToken(token)
        store.dispatch('user/getInfo')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        if (!response || !response.data) {
          commit('SET_TOKEN', '')
          removeToken()
          resolve()
        }

        const { user, role } = response.data

        // roles must be a non-empty array
        if (!role || role.id <= 0) {
          reject('getInfo: role mustn\'t be empty!')
        }
        commit('SET_USER', user)
        commit('SET_ROLE', role)
        commit('SET_INTRODUCTION', user.introduction)
        commit('SET_NAME', user.username)
        commit('SET_AVATAR', user.avatar)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 退出系统
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_USER', {})
        commit('SET_ROLE', {})
        commit('SET_INTRODUCTION', '')
        commit('SET_NAME', '')
        commit('SET_AVATAR', '')
        removeToken()
        storage.clear()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 刷新token
  refreshToken({ commit, state }) {
    return new Promise((resolve, reject) => {
      refreshToken({ token: state.token }).then(response => {
        const { token } = response
        commit('SET_TOKEN', token)
        setToken(token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  changeRoles({ commit, dispatch }, role) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)

      const { roles } = await dispatch('getInfo')

      resetRouter()

      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      // reset visited views and cached views
      dispatch('tagsView/delAllViews', null, { root: true })

      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
