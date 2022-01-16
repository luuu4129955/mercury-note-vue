import request from "../helpers/request";

const URL = {
  LOGOUT: 'auth/logout',
  GET_INFO: '/auth'
}

export default {
  loginOrRegister(obj, {username, password}) {
    return request(`/auth/${obj.path}`, 'POST', {username, password})
  },
  logout() {
    return request(URL.LOGOUT)
  },
  getInfo() {
    return request(URL.GET_INFO)
  }

}
