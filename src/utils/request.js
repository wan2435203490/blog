import axios from "axios";
import {MessageBox, Message} from 'element-ui'
import constant from "./constant";
//form params
import qs from "qs";
import store from "@/store";
import {getToken} from "@/utils/auth";

// axios.defaults.baseURL = constant.baseURL;
// axios.defaults.timeout = constant.requestTimeout;

// create an axios instance
// console.log("env:",process.env)
const service = axios.create({
  // baseURL: process.env.BASE_URL,
  baseURL: constant.baseURL,
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {

  if (store.getters.token) {
    // let each request carry token
    config.headers['Authorization'] = constant.authorizationPrefix + getToken()
    config.headers['Content-Type'] = 'application/json'
  }
  return config
}, error => {
  console.log(error) // for debug
  return Promise.reject(error)
});

// response interceptor
service.interceptors.response.use(
  response => {
    //这里会最先拿到你的response
    // 只要返回的状态码是2xx，都会进来这里
  const code = response.data.code

  if (code === 401) {
    debugger
    //remove cookies token and set store.state.token=''
    store.dispatch('user/resetToken')
    if (location.href.indexOf('login') !== -1) {
      location.reload() // 为了重新实例化vue-router对象 避免bug
    } else {
      MessageBox.confirm(
        '登录状态已过期，您可以继续留在该页面，或者重新登录',
        '系统提示',
        {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    }
  } else if (code === 6401) {
    debugger
    store.dispatch('user/resetToken')
    MessageBox.confirm(
      '登录状态已过期，您可以继续留在该页面，或者重新登录',
      '系统提示',
      {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }
    ).then(() => {
      location.reload() // 为了重新实例化vue-router对象 避免bug
    })
    return false
  } else if (code !== 200) {
    console.log(response.data.message)
    Message({
      message: response.data.message,
      type: 'error'
    })
    return Promise.reject(response.data.message)
  } else {
    return response.data
  }

  },
    error => {
// 1. http状态码非2开头的都会进来这里，如404,500等
// 2. 取消请求也会进入这里，CancelToken，可以用axios.isCancel(err)来判断是取消的请求
// 3. 请求运行有异常也会进入这里，如故意将headers写错：axios.defaults.headers = '123',或者在request中有语法或解析错误也会进入这里
// 进入这里意味着请求失败，axios会进入catch分支
  if (error.message === 'Network Error') {
    Message({
      message: '服务器连接异常，请检查服务器！',
      type: 'error',
      duration: 5 * 1000
    })
    return
  }

  Message({
    message: error.response.data.message,
    type: 'error',
    duration: 5 * 1000
  })

  //只有reject才会进catch分支 没有这一句会走then then报错的话会进catch
  return Promise.reject(error.response.data.message)
});

// 当data为URLSearchParams对象时设置为application/x-www-form-urlencoded;charset=utf-8
// 当data为普通对象时，会被设置为application/json;charset=utf-8

// export default service

export default {

  post(url, params = {}, isAdmin = false) {
//     let params = { c: 'b', a: 'd' };
//     qs.stringify(params)
//     'c=b&a=d'
    return service.post(url, params)
  },
  postForm(url, params = {}, isAdmin = false) {
    return service.post(url, qs.stringify(params))
  },
  //post(url, params = {}, isAdmin = false, json = true) {
    // let config;
    // if (isAdmin) {
    //   config = {
    //     headers: {"Authorization": localStorage.getItem("adminToken")}
    //   };
    // } else {
    //   config = {
    //     headers: {"Authorization": localStorage.getItem("userToken")}
    //   };
    // }
    // console.log(url)
    //
    // return new Promise((resolve, reject) => {
    //   axios
    //     .post(url, json ? params : qs.stringify(params), config)
    //     .then(res => {
    //       // console.log("then", res.data)
    //       resolve(res.data);
    //     })
    //     .catch(err => {
    //       // console.log("then", err)
    //       reject(err);
    //     });
    // });
  // },

  get(url, params = {}) {
    return service.get(url, {params})
  },

  // get(url, params = {}, isAdmin = false) {
    // let headers;
    // if (isAdmin) {
    //   headers = {"Authorization": localStorage.getItem("adminToken")};
    //   // console.log("get request:",url,localStorage.getItem("adminToken"),params)
    // } else {
    //   headers = {"Authorization": localStorage.getItem("userToken")};
    //   // console.log("get request:",url,localStorage.getItem("userToken"),params)
    // }
    //
    // return new Promise((resolve, reject) => {
    //   service.get(url, {
    //     params,
    //     //headers
    //   }).then(res => {
    //     resolve(res.data);
    //   }).catch(err => {
    //     reject(err)
    //   })
    // });
  // },

  put(url, data={}){
    return service.put(url, data)
  },

  delete(url, data){
    return service.delete(url, {data})
  },

  upload(url, param, isAdmin = false) {
    console.log("upload:",url)
    let config;
    if (isAdmin) {
      config = {
        headers: {"Authorization": localStorage.getItem("adminToken"), "Content-Type": "multipart/form-data"}
      };
    } else {
      config = {
        headers: {"Authorization": localStorage.getItem("userToken"), "Content-Type": "multipart/form-data"}
      };
    }
    return new Promise((resolve, reject) => {
      axios
        .post(url, param, config)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  uploadQiniu(url, param) {
    console.log("uploadQiniu:",url)
    let config = {
      headers: {"Content-Type": "multipart/form-data"},
      timeout: 60000
    };

    return new Promise((resolve, reject) => {
      axios
        .post(url, param, config)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}
