import main from '@/views/main'
// import parentView from '@/views/components/parent-view'

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/views/pages/login/login.vue')
  },
  {
    path: '/',
    name: 'index',
    redirect: '/home',
    component: main,
    meta: {
      hideInMenu: true,
      notCache: true,
      title: '首页'
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          hideInMenu: true,
          notCache: true,
          title: '首页'
        },
        component: () => import('@/views/single-page/home')
      }
    ]
  },
  {
    path: '/cms',
    name: '管理',
    component: main,
    meta: {
      icon: 'social-buffer',
      title: '管理'
    },
    children: [
      {
        path: 'manage/user',
        name: '人员管理',
        meta: {
          icon: 'ios-grid-view',
          title: '人员管理'
        },
        component: () => import('@/views/pages/user')
      }
    ]
  }
]
