import axios from 'axios'
export default {
  namespaced: true,
  state: {
    cityListAll: [],
    hotCity: []
  },
  mutations: {
    setCityList (state, data) {
      state.cityListAll = data
    }
  },
  actions: {
    cityAxios (store) {
      const url = '/api/gateway?k=553041'
      const type = 'mall.film-ticket.city.list'
      axios({
        url: url,
        method: 'get',
        headers: {
          'X-Host': type
        }
      })
        .then((res) => {
          store.commit('setCityList', res.data.data.cities)
        })
    }
  },
  getters: {
    cityList (state) {
      var arr = []
      var arr2 = []
      state.hotCity = []
      state.cityListAll.forEach(item => {
        var first = item.pinyin.substring(0, 1).toUpperCase()
        arr.push(first)
        if (item.isHot === 1) {
          state.hotCity.push({ cityId: item.cityId, cityName: item.name })
        }
      })
      arr = arr.filter((item, index) => {
        return arr.indexOf(item) === index
      })
      arr.sort((a, b) => {
        return a.charCodeAt() - b.charCodeAt()
      })
      arr.forEach(item => {
        arr2.push({
          key: item,
          cityS: []
        })
      })
      state.cityListAll.forEach(item => {
        var first = item.pinyin.substring(0, 1).toUpperCase()
        var obj = {
          cityName: item.name,
          cityId: item.cityId,
          pinyin: item.pinyin
        }
        arr2.forEach(i => {
          if (first === i.key) {
            i.cityS.push(obj)
          }
        })
      })
      return arr2
    }
  }
}
