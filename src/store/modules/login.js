/* 
存储用户登录信息
*/
export default {
  namespaced: true,
  state: {
    userInfo: {
      username: "",
      token: "",
    },
  },
  mutations: {
    /* 登录设置信息 */
    setUser(state, payload) {
      state.userInfo = payload;
    },
    /* 退出登录清除数据 */
    removeUser(state, payload) {
      state.userInfo = {
        username: "",
        token: "",
      };
    },
  },
};
