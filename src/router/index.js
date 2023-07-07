import Vue from 'vue'
import VueRouter from 'vue-router'

/* Layout */
// import Layout from '@/layout'

const originalPush = VueRouter.prototype.push;
// 重写push函数 fix 跳转到一个相同路由的报错
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
}

Vue.use(VueRouter)


/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  // {
  //   // todo redirect
  //   path: '/redirect',
  //   //component: Layout,
  //   hidden: true,
  //   children: [
  //     {
  //       path: '/redirect/:path*',
  //       component: () => import('@/views/redirect/index')
  //     }
  //   ]
  // },
  {
    path: '/',
    component: () => import('@/views/home'),
    children: [{
      path: "/",
      name: "index",
      component: () => import('../views/index')
    }, {
      path: "/sort",
      name: "sort",
      component: () => import('../views/sort')
    }, {
      path: "/article",
      name: "article",
      component: () => import('../views/article')
    }, {
      path: "/weiYan",
      name: "weiYan",
      component: () => import('../views/weiYan')
    }, {
      path: "/love",
      name: "love",
      component: () => import('../views/love')
    }, {
      path: "/favorite",
      name: "favorite",
      component: () => import('../views/favorite')
    }, {
      path: "/message",
      name: "message",
      component: () => import('../views/message')
    }, {
      path: "/friend",
      name: "friend",
      component: () => import('../views/friend')
    }, {
      path: "/funny",
      name: "funny",
      component: () => import('../views/funny')
    }, {
      path: "/about",
      name: "about",
      component: () => import('../views/about')
    }, {
      path: "/user",
      name: "user",
      component: () => import('../views/user')
    }, {
      path: "/letter",
      name: "letter",
      component: () => import('../views/letter')
    }]
  },
  {
    path: '/admin',
    redirect: '/main',
    meta: {requiresAuth: true},
    component: () => import('../views/admin/admin'),
    children: [{
      path: '/main',
      name: 'main',
      component: () => import('../views/admin/main')
    }, {
      path: '/webEdit',
      name: 'webEdit',
      component: () => import('../views/admin/webEdit')
    }, {
      path: '/userList',
      name: 'userList',
      component: () => import('../views/admin/userList')
    }, {
      path: '/postList',
      name: 'postList',
      component: () => import('../views/admin/postList')
    }, {
      path: '/postEdit',
      name: 'postEdit',
      component: () => import('../views/admin/postEdit')
    }, {
      path: '/sortList',
      name: 'sortList',
      component: () => import('../views/admin/sortList')
    }, {
      path: '/commentList',
      name: 'commentList',
      component: () => import('../views/admin/commentList')
    }, {
      path: '/treeHoleList',
      name: 'treeHoleList',
      component: () => import('../views/admin/treeHoleList')
    }, {
      path: '/resourceList',
      name: 'resourceList',
      component: () => import('../views/admin/resourceList')
    }, {
      path: '/loveList',
      name: 'loveList',
      component: () => import('../views/admin/loveList')
    }, {
      path: '/resourcePathList',
      name: 'resourcePathList',
      component: () => import('../views/admin/resourcePathList')
    }]
  },
  {
    path: '/verify',
    name: 'verify',
    component: () => import('../views/admin/verify')
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [

]

const createRouter = () => new VueRouter({
  mode: "history", // require service support
  routes: constantRoutes,
  scrollBehavior: () => ({ x:0, y: 0 }),
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // dynamic reset router
}

router.beforeEach((to, from, next) => {
  //router admin need requiresAuth
  if (to.matched.some(record => record.meta.requiresAuth)) {
    next();
    // if (!Boolean(localStorage.getItem("adminToken"))) {
    //   next({
    //     path: '/verify',
    //     query: {redirect: to.fullPath}
    //   });
    // } else {
    //   next();
    // }
  } else {
    next();
  }
})

export default router
