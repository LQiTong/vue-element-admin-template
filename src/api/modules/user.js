import fetch from '@/utils/request'

const userApis = {
  handleLogin(data) {
    return fetch({
      url: '/user/login',
      method: 'post',
      data
    })
  }
}

export default userApis
