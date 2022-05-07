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
      title: '任务列表',
      show: false
    },
    component: 'TaskList'
  },
  {
    name: 'task-friends-add',
    parentId: 30000,
    id: 30002,
    meta: {
      icon: 'table',
      title: '添加好友'
    },
    component: 'TaskFriendsAdd'
  },
  {
    name: 'task-friends-circle',
    parentId: 30000,
    id: 30003,
    meta: {
      icon: 'table',
      title: '朋友圈'
    },
    component: 'TaskFriendsCircle'
  },
  {
    name: 'task-mass-msg',
    parentId: 30000,
    id: 30004,
    meta: {
      icon: 'table',
      title: '群发消息'
    },
    component: 'TaskMassMsg'
  },
  /** *** 资料管理 *****/
  {
    name: 'material',
    parentId: 0,
    id: 40000,
    meta: {
      icon: 'table',
      title: '资料管理'
    },
    component: 'PageView',
    redirect: '/material/talk'
  },
  {
    name: 'material-talk',
    parentId: 40000,
    id: 40001,
    meta: {
      icon: 'table',
      title: '话术管理'
    },
    component: 'MaterialTalk'
  },
  {
    name: 'material-nickname',
    parentId: 40000,
    id: 40002,
    meta: {
      icon: 'table',
      title: '昵称管理'
    },
    component: 'MaterialNickname'
  },
  {
    name: 'material-portrait',
    parentId: 40000,
    id: 40003,
    meta: {
      icon: 'table',
      title: '头像管理'
    },
    component: 'MaterialPortrait'
  },
  {
    name: 'material-picture',
    parentId: 40000,
    id: 40004,
    meta: {
      icon: 'table',
      title: '图片管理'
    },
    component: 'MaterialPicture'
  },

  /** *** 错误提示页（后续不做更改） *****/
  {
    name: 'error',
    parentId: 0,
    id: 99990,
    meta: {
      icon: 'table',
      title: '错误页面',
      show: false
    },
    component: 'PageView',
    redirect: '/error/error404'
  },
  {
    name: 'error404',
    parentId: 99990,
    id: 99991,
    meta: {
      icon: 'table',
      title: '404页面',
      show: false
    },
    component: '404'
  },
  {
    name: 'error403',
    parentId: 99990,
    id: 99992,
    meta: {
      icon: 'table',
      title: '403页面',
      show: false
    },
    component: '403'
  },
  {
    name: 'error500',
    parentId: 99990,
    id: 99993,
    meta: {
      icon: 'table',
      title: '500页面',
      show: false
    },
    component: '500'
  }
]
