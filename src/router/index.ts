import {
  createRouter,
  createWebHashHistory,
  RouteRecordRaw,
  createWebHistory
} from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/home.vue')
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/login.vue')
    // component: '../views/login.vue'
  },
  {
    path: '/backstage',
    name: 'backstage',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ '../components/backStage/login/index.vue'
      )
    // component: '../views/login.vue'
  },
  {
    path: '/register',
    name: 'register',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/register.vue')
  },
  {
    path: '/vedio',
    name: 'vedio',
    component: () =>
      import(
        /* webpackChunkName: "about" */ '../components/directSeeding/list.vue'
      )
  },
  {
    path: '/registerFormOne',
    name: 'registerFormOne',
    component: () =>
      import(
        /* webpackChunkName: "about" */ '../views/registrationForm/one.vue'
      )
  },
  {
    path: '/registerFormTwo',
    name: 'registerFormTwo',
    component: () =>
      import(
        /* webpackChunkName: "about" */ '../views/registrationForm/two.vue'
      )
  },
  {
    path: '/backHome',
    name: 'backHome',
    component: () =>
      import(
        /* webpackChunkName: "about" */ '../components/backStage/home/index.vue'
      )
  },
  {
    path: '/statistics',
    name: 'statistics',
    component: () =>
      import(
        /* webpackChunkName: "about" */ '../components/government/dataAnalysis/yizhangtu.vue'
      )
  },
  {
    path: '/jindie',
    name: 'jindie',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/jindie.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
// 路由拦截，判断是否需要登录
// router.beforeEach((to, from, next) => {
//   // console.log("title",document.title)
//   // 通过requiresAuth判断当前路由导航是否需要登录

//   let token = sessionStorage.getItem('userName')
//   // console.log("token",token)
//   // 若需要登录访问，检查是否为登录状态\
//   // console.log(to, from, next)

//   if (to.path == '/login') {
//     next()
//   } else {
//     if (!token) {
//       // console.log(123321, next('/'))

//       next({ path: '/login' })
//     } else {
//       next()
//     }
//   }
// })

export default router
