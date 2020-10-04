import axios from 'axios'
export default {
  namespaced: true,
  state: {
    cinemas: ''
  },
  mutations: {
    setCinemas (state, data) {
      state.cinemas = data
    }
  },
  actions: {
    cinemaAxios (store) {
      axios({
        url: '/api/gateway?cityId=' + store.rootState.cityId,
        headers: {
          'X-Host': 'mall.film-ticket.cinema.list'
        }
      })
        .then((res) => {
          store.commit('setCinemas', res.data.data.cinemas)
        })
    },
    cinemaInfoAxios (store) {
      axios({
        url: ''
      })
    }
  }
}
