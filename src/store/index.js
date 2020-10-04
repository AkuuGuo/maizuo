import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import home from './modules/home'
import address from './modules/address'
import film from './modules/film'
import cinema from './modules/cinema'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cityId: '440300',
    cityName: '深圳',
    pathId: '',
    filmId: ''
  },
  mutations: {
    setCityId (state, data) {
      state.cityName = data.cityName
      state.cityId = data.cityId
    },
    setPathId (state, data) {
      state.pathId = data
    },
    setFilmId (state, data) {
      state.filmId = data
    }
  },
  actions: {
    set () {
      axios.get()
    }
  },
  modules: {
    home,
    address,
    film,
    cinema
  }
})
