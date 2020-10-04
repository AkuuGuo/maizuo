import axios from 'axios'
export default {
  namespaced: true,
  state: {
    filmInfo: {},
    photos: []
  },
  mutations: {
    setFilmInfo (state, data) {
      state.filmInfo = data
      state.photos = data.photos
    }
    // setPhotos (state, data) {
    //   state.photos = data
    // }
  },
  actions: {
    filmAxios (store) {
      var url = '/api/gateway?filmId=' + store.rootState.filmId + '&k=2625650'
      var head = 'mall.film-ticket.film.info'
      axios({
        url: url,
        method: 'get',
        headers: {
          'X-Host': head
        }
      })
        .then((res) => {
          store.commit('setFilmInfo', res.data.data.film)
          // store.commit('setPhotos', res.data.data.film.photos)
        })
    }
  },
  getters: {
    getYear (state) {
      return new Date(state.filmInfo.premiereAt * 1000).getFullYear()
    },
    picItemsWidth (state) {
      return state.photos.length * 1.7 + 'rem'
    }
  }
}
