export default [
  {
    name: 'account',
    parentId: 0,
    id: 10000,
    meta: {
      icon: 'table',
      title: '账号管理'
    },
    component: 'AccountList'
  },
  {
    name: 'error',
    parentId: 0,
    id: 20000,
    meta: {
      icon: 'table',
      title: '错误页面'
    },
    component: 'PageView',
    redirect: '/error/404'
  },
  {
    name: 'error404',
    parentId: 20000,
    id: 20001,
    meta: {
      icon: 'table',
      title: '404页面'
    },
    component: '404'
  },
  {
    name: 'error403',
    parentId: 20000,
    id: 20002,
    meta: {
      icon: 'table',
      title: '403页面'
    },
    component: '403'
  },
  {
    name: 'error500',
    parentId: 20000,
    id: 20003,
    meta: {
      icon: 'table',
      title: '500页面'
    },
    component: '500'
  }
]
