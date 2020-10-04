<template>
  <div class="home">
    <Top v-show="show"/>
    <div :class="show?'tabsfixed':''">
      <van-tabs
      lineWidth=".56rem"
      v-model="active"
      line-height=".02rem"
      title-active-color="#ff5f16"
      @click="changeList"
      >
        <van-tab title="正在热映"></van-tab>
        <van-tab title="即将上映"></van-tab>
      </van-tabs>
    </div>
    <transition mode="out-in">
      <van-pull-refresh @refresh="onRefresh" v-model="isLoading">
        <Content/>
      </van-pull-refresh>
    </transition>
  </div>
</template>

<script>
import Vue from 'vue'
import Top from './Top'
import Content from './Content'
import { Tab, Tabs, PullRefresh, Toast } from 'vant'
import { mapActions, mapMutations, mapState } from 'vuex'

Vue.use(Tab)
Vue.use(Tabs)
Vue.use(Toast)
Vue.use(PullRefresh)
export default {
  components: {
    Top,
    Content
  },
  data () {
    return {
      active: 0,
      show: false,
      isLoading: false
    }
  },
  computed: {
    ...mapState({
      tabActive: state => state.home.tabActive
    })
  },
  methods: {
    ...mapActions({
      homeAxios: 'home/homeAxios'
    }),
    ...mapMutations({
      setTabActive: 'home/setTabActive'
    }),
    onRefresh () {
      setTimeout(() => {
        this.homeAxios(this.tabActive)
        Toast('刷新成功')
        this.isLoading = false
      }, 1000)
    },
    handleScroll () {
      var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop > 100) {
        this.show = true
      } else {
        this.show = false
      }
    },
    changeList () {
      this.setTabActive(this.active)
      this.homeAxios()
    }
  },
  created () {
    this.active = this.tabActive - 1
    this.homeAxios()
    if (this.cityId === '') {
      // this.$router.push('/address')
    }
    window.addEventListener('scroll', this.handleScroll)
  }
}
</script>

<style lang='less' scoped>
.home{
  /deep/ .van-tabs__line{
    background: #ff5f16;
  }
  .topfixed{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 888;
  }
  .tabsfixed{
    background: #fff;
    width: 100%;
    position: fixed;
    top: 0.42rem;
    left: 0;
    z-index: 99;
  }
  @keyframes fadeIn {
    0%{opacity: 0; transform: translateX(-100%)} /* v-enter */
    100%{opacity: 1; transform: translateX(0)} /* v-enter-to */
  }
  @keyframes fadeOut {
    0%{opacity: 1; transform: translateX(0)} /* v-leave */
    100%{opacity: 0; transform: translateX(100%)} /* v-leave-to */
  }
  .v-enter-active{
    animation: fadeIn .5s
  }
  .v-leave-active{
    animation: fadeOut .5s
  }
}
</style>
