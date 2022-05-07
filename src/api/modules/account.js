import fetch from '@/utils/request'

const accountApis = {
  // 获取用户列表
  getUserList() {
    return fetch({
      url: '/user/list',
      method: 'post'
    })
  }
}

export default accountApis
