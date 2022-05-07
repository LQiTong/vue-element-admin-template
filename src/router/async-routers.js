export default [
  /** *** 账号管理 *****/
  {
    name: 'account',
    parentId: 0,
    id: 10000,
    meta: {
      icon: 'table',
      title: '账号管理'
    },
    component: 'PageView',
    redirect: '/account/account-list'
  },
  {
    name: 'account-list',
    parentId: 10000,
    id: 10001,
    meta: {
      icon: 'table',
      title: '账号列表'
    },
    component: 'AccountList'
  },
  {
    name: 'account-group',
    parentId: 10000,
    id: 10002,
    meta: {
      icon: 'table',
      title: '账号分组'
    },
    component: 'AccountGroup'
  },
  {
    name: 'account-upload',
    parentId: 10000,
    id: 10003,
    meta: {
      icon: 'table',
      title: '账号上传'
    },
    component: 'AccountUpload'
  },
  /** *** IP管理 *****/
  {
    name: 'proxy',
    parentId: 0,
    id: 20000,
    meta: {
      icon: 'table',
      title: 'IP管理'
    },
    component: 'PageView',
    redirect: '/proxy/proxy-list'
  },
  {
    name: 'proxy-list',
    parentId: 20000,
    id: 20001,
    meta: {
      icon: 'table',
      title: 'IP列表'
    },
    component: 'ProxyList'
  },
  {
    name: 'proxy-group',
    parentId: 20000,
    id: 20002,
    meta: {
      icon: 'table',
      title: 'IP分组'
    },
    component: 'ProxyGroup'
  },
  /** *** 任务管理 *****/
  {
    name: 'task',
    parentId: 0,
    id: 30000,
    meta: {
      icon: 'table',
      title: '任务管理'
    },
    component: 'PageView',
    redirect: '/task/task-list'
  },
  {
    name: 'task-list',
    parentId: 30000,
    id: 30001,
    meta: {
      icon: 'table',
      title: '任务列表'
    },
    component: 'TaskList'
  }

  /** *** 错误提示页 *****/
  // {
  //   name: 'error',
  //   parentId: 0,
  //   id: 99990,
  //   meta: {
  //     icon: 'table',
  //     title: '错误页面',
  //     show: false
  //   },
  //   component: 'PageView',
  //   redirect: '/error/404'
  // },
  // {
  //   name: 'error404',
  //   parentId: 99990,
  //   id: 99991,
  //   meta: {
  //     icon: 'table',
  //     title: '404页面',
  //     show: false
  //   },
  //   component: '404'
  // },
  // {
  //   name: 'error403',
  //   parentId: 99990,
  //   id: 99992,
  //   meta: {
  //     icon: 'table',
  //     title: '403页面',
  //     show: false
  //   },
  //   component: '403'
  // },
  // {
  //   name: 'error500',
  //   parentId: 99990,
  //   id: 99993,
  //   meta: {
  //     icon: 'table',
  //     title: '500页面',
  //     show: false
  //   },
  //   component: '500'
  // }
]
