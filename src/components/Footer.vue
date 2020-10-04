<template>
  <van-tabbar active-color="#d86b44" :route='boolean' v-show='isShow'>
    <van-tabbar-item icon="video-o" to='/'>电影</van-tabbar-item>
    <van-tabbar-item icon="shop-o" to='/cinema'>影院</van-tabbar-item>
    <van-tabbar-item icon="comment-o" to='/info'>资讯</van-tabbar-item>
    <van-tabbar-item icon="user-o" to='/mine'>我的</van-tabbar-item>
  </van-tabbar>
</template>

<script>
import Vue from 'vue'
import { Tabbar, TabbarItem } from 'vant'

Vue.use(Tabbar)
Vue.use(TabbarItem)
export default {
  data () {
    return {
      boolean: true,
      isShow: true
    }
  },
  watch: {
    $route (to, from) {
      // console.log(this.$route.path)
      var path = this.$route.path
      if (path !== '/' && path !== '/cinema' && path !== '/mine') {
        this.isShow = false
      } else {
        this.isShow = true
      }
    }
  }
}
</script>

<style lang='less' scoped>

</style>
