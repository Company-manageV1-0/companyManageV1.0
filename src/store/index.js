import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)


export default new Vuex.Store({
  
  state: {
    token:'',
    data:'',
    showfirst:true,
    // log:true,
  },
  mutations: {
    change(state,showfirst){
      state.showfirst = showfirst
      // sessionStorage.showfirst = showfirst 
      // sessionStorage.setItem("showfirst",showfirst);
    },

    download(state,data){
      state.data = data
    },
    
    // changeone(state,log){
    //   state.log = log
    // },

    set_token(state,token) { 
      state.token = token 
      sessionStorage.token = token 
      sessionStorage.setItem("token",token);
    },

    del_token(state) { 
      state.token = ''
      sessionStorage.removeItem('token') 
    },
  },


  actions: {
  },
  modules: {
  }
})
