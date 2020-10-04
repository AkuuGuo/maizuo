import axios from 'axios'

export default {
  namespaced: true,
  state: {
    filmList: [],
    tabActive: 1
  },
  mutations: {
    setFilmList (state, data) {
      state.filmList = data
    },
    setTabActive (state, data) {
      state.tabActive = data + 1
    }
  },
  actions: {
    homeAxios (store) {
      var url = '/api/gateway?cityId=' + store.rootState.cityId + '&pageNum=1&pageSize=20&type=' + store.state.tabActive + '&k=7795898'
      axios({
        url: url,
        headers: {
          'X-Host': 'mall.film-ticket.film.list'
        }
      })
        .then((res) => {
          store.commit('setFilmList', res.data.data.films)
        })
    }
  }
}
