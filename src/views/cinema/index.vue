<template>
  <div class="cinema">
    <van-nav-bar title="影院" :left-text="cityName" :fixed='fixed' :border='!fixed'>
      <template #left>
        <span class="gps" @click="changeAds">{{cityName}}</span>
        <van-icon name="arrow-down" size=".1rem" color="#999" />
      </template>
      <template #right>
        <van-icon name="search" size="18" color="#000"/>
      </template>
    </van-nav-bar>
    <van-dropdown-menu class="tabsfixed">
      <van-dropdown-item v-model="value1" :options="option1" />
      <van-dropdown-item v-model="value2" :options="option2" />
      <van-dropdown-item v-model="value3" :options="option3" />
    </van-dropdown-menu>
    <Content/>
  </div>
</template>

<script>
import Vue from 'vue'
import { NavBar, Icon, DropdownMenu, DropdownItem } from 'vant'
import Content from './Content'

Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Icon)
Vue.use(NavBar)
export default {
  components: {
    Content
  },
  data () {
    return {
      item: ['全城', 'APP订票', '最近去过'],
      active: '',
      fixed: true,
      value1: 0,
      value2: 'a',
      value3: 'a',
      option1: [
        { text: '全城', value: 0 },
        { text: '福田', value: 1 },
        { text: '南山', value: 2 }
      ],
      option2: [
        { text: 'APP订票', value: 'a' },
        { text: '前台兑换', value: 'b' }
      ],
      option3: [
        { text: '最近去过', value: 'a' },
        { text: '离我最近', value: 'b' }
      ]
    }
  },
  computed: {
    cityName () {
      return this.$store.state.cityName
    }
  },
  methods: {
    changeAds () {
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

<style lang='less' scoped>
.cinema{
  .gps{
    font-size: 0.13rem;
    margin-right: .05rem;
  }
  .tabsfixed{
    width: 100%;
    position: fixed;
    top: 0.40rem;
    left: 0;
    color: #000;
    border: 0;
    /deep/ .van-dropdown-menu__bar{
      box-shadow: none;
    }
  }
}
</style>
