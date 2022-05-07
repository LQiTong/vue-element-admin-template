import fetch from '@/utils/request'

const menuApis = {
  getMenu() {
    return fetch({
      url: '`menu/user_menu',
      method: 'post'
    })
  }
}

export default menuApis
