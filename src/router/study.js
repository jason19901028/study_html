/* eslint-disable */
const study = [
  {
    path: '',
    name: '首页',
    // redirect: { name: '课程' },
    meta: {
      title: '首页',
      requiresAuth: true
    },
    component: () => import('pages/study'),
    children: [
      {
        path: '',
        name: '首页',
        meta: {
          title: '首页',
          requiresAuth: true
        },
        component: () => import('pages/study/study')
      },
      {
        path: '/curriculum',
        name: '课程',
        meta: {
          title: '课程',
          requiresAuth: true
        },
        component: () => import('pages/curriculum')
      },
      {
        path: '/video-detail',
        name: '课程详情',
        meta: {
          title: '课程详情',
          requiresAuth: true
        },
        component: () => import('pages/curriculum/curriculum-detail')
      },
      {
        path: '/test',
        name: '试题',
        meta: {
          title: '试题',
          requiresAuth: true
        },
        component: () => import('pages/test')
      },
      {
        name: 'Result',
        path: '/result',
        component: () => import('pages/test/result.vue')
      },
      {
        path: '/user',
        name: '我的',
        meta: {
          title: '我的',
          requiresAuth: true
        },
        component: () => import('pages/user')
      }
    ]
  },
  {
    path: '/exam-detail',
    name: '测试',
    meta: {
      title: '测试',
      requiresAuth: true
    },
    component: () => import('pages/test/exam1.vue')
    // props: (route) => { id: route.query.id }
  },
  {
    path: '/user-info',
    name: '个人信息',
    meta: {
      title: '首页',
      requiresAuth: true
    },
    component: () => import('pages/user/user-info.vue')
  },
  {
    path: '/collect',
    name: '我的收藏',
    meta: {
      title: '我的收藏',
      requiresAuth: true
    },
    component: () => import('pages/user/collect.vue')
  },
  {
    path: '/history-test',
    name: '历史测试',
    meta: {
      title: '历史测试',
      requiresAuth: true
    },
    component: () => import('pages/user/history-test.vue')
  },
  {
    path: '/error-reponse',
    name: '错题库',
    meta: {
      title: '错题库',
      requiresAuth: true
    },
    component: () => import('pages/user/error-reponse.vue')
  },
  {
    path: '/test-report',
    name: '测试报告',
    meta: {
      title: '测试报告',
      requiresAuth: true
    },
    component: () => import('pages/test/test-report.vue')
  },
  {
    path: '/404',
    name: 'not-fount',
    meta: {
      title: '404未找到'
    },
    component: () => import('pages/404page/404.vue')
  }
]

export default study
