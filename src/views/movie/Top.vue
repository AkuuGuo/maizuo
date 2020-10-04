<template>
  <div class="top">
    <van-nav-bar title="电影" :fixed=fixed>
      <template #left>
        <span class="gps" @click="chooseAddress">{{cityName}}</span><van-icon name="arrow-down" size=".1rem" color="#999" />
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
import Vue from 'vue'
import { NavBar, Icon } from 'vant'

Vue.use(Icon)
Vue.use(NavBar)
export default {
  data () {
    return {
      fixed: true
    }
  },
  computed: {
    cityName () {
      return this.$store.state.cityName
    }
  },
  methods: {
    chooseAddress () {
      this.$router.push({
        name: 'address',
        params: {
          path: this.$route.path
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.top{
  .gps{
    font-size: 0.13rem;
    margin-right: .05rem;
  }
}
</style>
