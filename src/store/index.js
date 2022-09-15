import Vue from 'vue'
import Vuex from 'vuex'

import { getAuth, createUserWithEmailAndPassword ,} from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import router from '../router'
const auth = getAuth();
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    usuario: null,
    error: null
  },
  getters: {
    existeUsuario(state){
      if(state.usuario === null){
          return false
      }else{
          return true
      }
    }
  },
  mutations: {
    setUsuario(state, payload){
      state.usuario = payload
    },
    setError(state, payload){
      state.error = payload
    }
  },
  actions: {
    crearUsuario({commit}, usuario){
      createUserWithEmailAndPassword(auth, usuario.email, usuario.password)
        .then(res => {
          
          const usuario = {
            email: res.user.email,
            uid: res.user.uid
          }
          console.log(usuario)
          commit('setUsuario', usuario)
          router.push('/')
        })
        .catch(error => {
          console.log(error)
          commit('setError', error)
        })
    },
    ingresoUsuario({commit}, usuario){
      signInWithEmailAndPassword(auth ,usuario.email, usuario.password)
      .then(res => {
          console.log(res)
          const usuario = {
              email: res.user.email,
              uid: res.user.uid
          }
          commit('setUsuario', usuario)
          router.push('/')
      })
      .catch(error => {
          console.log(error)
          commit('setError', error)
      })
  },
    detectarUsuario({commit}, usuario){
      commit('setUsuario', usuario)
  // eslint-disable-next-line no-unused-vars
  },cerrarSesion({commit}){
    auth.signOut()
    router.push('/ingreso')
}
  

  },
  modules: {
  }
})
