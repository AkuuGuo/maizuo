<template>
  <div id='app'>
    <transition mode="out-in">
      <router-view/>
    </transition>
    <Footer/>
  </div>
</template>

<script>
import Footer from '../src/components/Footer'
import axios from 'axios'
export default {
  components: {
    Footer
  },
  methods: {
    getGps (url, type) {
      axios({
        url: url,
        method: 'get',
        headers: {
          'X-Host': type
        }
      })
        .then((res) => {
          console.log(res)
        })
    }
  },
  mounted () {
    // var url = '/api/gateway?k=553041'
    // var url = '/api/gateway?cityId=440300&pageNum=1&pageSize=10&type=1&k=7795558'
    // var type = 'mall.film-ticket.film.list'
    // this.getGps(url, type)
  }
}
</script>

<style lang='less' scoped>
#app{
  @keyframes fadeIn {
    0%{opacity: 0; transform: translateY(.20rem)} /* v-enter */
    100%{opacity: 1; transform: translateY(0)} /* v-enter-to */
  }
  @keyframes fadeOut {
    0%{opacity: 1; transform: translateY(0)} /* v-leave */
    100%{opacity: 0; transform: translateY(.10rem)} /* v-leave-to */
  }
  .v-enter-active{
    animation: fadeIn .8s
  }
  .v-leave-active{
    animation: fadeOut .3s
  }
}
</style>
