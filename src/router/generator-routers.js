import Layout from '@/layout'
import PageView from '@/layout/PageView'

// 前端路由表
const constantRouterComponents = {
  // 基础页面
  Layout,
  PageView,

  403: () => import(/* webpackChunkName: "error" */ '@/views/error-page/403'),
  404: () => import(/* webpackChunkName: "error" */ '@/views/error-page/404'),
  500: () => import(/* webpackChunkName: "error" */ '@/views/error-page/500'),

  // account 账号管理
  AccountList: () => import('@/views/account/list'),
  AccountGroup: () => import('@/views/account/group'),
  AccountUpload: () => import('@/views/account/upload'),
  // proxy IP管理 代理
  ProxyList: () => import('@/views/proxy/list'),
  ProxyGroup: () => import('@/views/proxy/group'),
  // task 任务管理
  TaskList: () => import('@/views/task/list'),
  TaskFriendsAdd: () => import('@/views/task/friendsAdd'),
  TaskFriendsCircle: () => import('@/views/task/friendsCircle'),
  TaskMassMsg: () => import('@/views/task/massMsg'),
  // 资料管理
  MaterialTalk: () => import('@/views/material/talk'),
  MaterialNickname: () => import('@/views/material/nickname'),
  MaterialPortrait: () => import('@/views/material/portrait'),
  MaterialPicture: () => import('@/views/material/picture')
}

/**
 * 格式化树形结构数据 生成 vue-router 层级路由表
 *
 * @param routerMap
 * @param parent
 * @returns {*}
 */
export const generator = (routerMap, parent) => {
  return routerMap.map(item => {
    const {
      title,
      show,
      icon,
      noCache,
      breadcrumb,
      affix,
      always,
      activeMenu
    } = item.meta || {}

    const currentRouter = {
      // 如果路由设置了 path，则作为默认 path，否则 路由地址 动态拼接生成如 /dashboard/workplace
      path: item.path || `${(parent && parent.path) || ''}/${item.key}`,
      // 路由名称，建议唯一
      name: item.name || item.key || '',
      // 该路由对应页面的 组件(动态加载)
      component:
        constantRouterComponents[item.component || item.key] || (resolve => require([`@/views/${item.component}`], resolve)),

      // meta: 页面标题, 菜单图标, 页面权限(供指令权限用，可去掉)
      meta: {
        title,
        icon,
        noCache,
        breadcrumb,
        affix,
        activeMenu,
        permission: item.name
      }
    }
    // 删除没值的Key
    Object.keys(currentRouter.meta).map(key => {
      if (
        currentRouter.meta[key] === null ||
        currentRouter.meta[key] === undefined
      ) {
        delete currentRouter.meta[key]
      }
    })
    // 是否设置了隐藏菜单
    if (show === false) {
      currentRouter.hidden = true
    }
    // 是否设置了隐藏菜单
    if (always) {
      currentRouter.alwaysShow = true
    }
    // 为了防止出现后端返回结果不规范，处理有可能出现拼接出两个 反斜杠
    if (!currentRouter.path.startsWith('http')) {
      currentRouter.path = currentRouter.path.replace('//', '/')
    }
    // 重定向
    item.redirect && (currentRouter.redirect = item.redirect)
    // 是否有子菜单，并递归处理
    if (item.children && item.children.length > 0) {
      // Recursion
      currentRouter.children = generator(item.children, currentRouter)
    }
    return currentRouter
  })
}

/**
 * 数组转树形结构
 * @param list 源数组
 * @param tree 树
 * @param parentId 父ID
 */
export const listToTree = (list, tree, parentId) => {
  list.forEach(item => {
    // 判断是否为父级菜单
    if (item.parentId === parentId) {
      const child = {
        ...item,
        key: item.key || item.name,
        children: []
      }
      // 迭代 list， 找到当前菜单相符合的所有子菜单
      listToTree(list, child.children, item.id)
      // 删掉不存在 children 值的属性
      if (child.children.length <= 0) {
        delete child.children
      }
      // 加入到树中
      tree.push(child)
    }
  })
}
