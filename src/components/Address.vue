<template>
  <div class="address">
    <van-nav-bar :title="title + cityName">
      <template #left>
        <van-icon name="cross" size="18" color='#000' @click='adsClick'/>
      </template>
    </van-nav-bar>
    <form action="/">
    <van-search
      v-model="value"
      :clearable='clearable'
      placeholder="输入城市名或拼音"
      @search="onSearch"
      @cancel="onCancel"
      />
    </form>
    <div class="hotcity">
      <h2>热门城市</h2>
      <ul>
        <li v-for="(item,index) in hotCity"
        :key="index"
        @click="chooseCity(item.cityName,item.cityId)"
        >{{item.cityName}}</li>
      </ul>
    </div>
    <div class="city">
      <van-index-bar>
        <div v-for="(item, index) in cityList" :key="index">
          <van-index-anchor :index="item.key" class="anchor"/>
          <van-cell
          ref="cell"
          v-for="(i, v) in item.cityS"
          :key="v"
          :title="i.cityName"
          @click='chooseCity(i.cityName,i.cityId)'
          />
        </div>
      </van-index-bar>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { IndexBar, IndexAnchor, Cell, NavBar, Search } from 'vant'
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'

Vue.use(NavBar)
Vue.use(IndexBar)
Vue.use(Cell)
Vue.use(Search)
Vue.use(IndexAnchor)
export default {
  data () {
    return {
      title: '当前城市-',
      value: '',
      clearable: true
    }
  },
  computed: {
    ...mapGetters({
      cityList: 'address/cityList'
    }),
    ...mapState({
      cityId: 'cityId',
      cityName: 'cityName',
      hotCity: state => state.address.hotCity
    })
  },
  methods: {
    ...mapActions({
      cityAxios: 'address/cityAxios'
    }),
    ...mapMutations(['setCityId']),
    onSearch (val) {
      console.log(val)
    },
    onCancel () {

    },
    adsClick () {
      this.$router.push(this.$route.params.path || '/')
    },
    chooseCity (cityName, cityId) {
      this.setCityId({ cityName, cityId })
      this.$router.push(this.$route.params.path || '/')
    }
  },
  created () {
    this.cityAxios()
  }
}
</script>

<style lang="less" scoped>
.address{
  background: #fff;
  padding-top: 1rem;
  .van-nav-bar{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 2;
  }
  form{
    width: 100%;
    position: fixed;
    top: 0.46rem;
    left: 0;
    z-index: 2;
  }
  .hotcity{
    background-color: #fff;
    padding-left: 0.15rem;
    padding-top: 0.15rem;
    h2{
      font-size: 0.13rem;
      color: #797d82;
      margin-bottom: 0.1rem;
    }
    ul{
      overflow: hidden;
      li{
        float: left;
        margin-right: 0.18rem;
        margin-bottom: 0.1rem;
        width: .99rem;
        height: 0.30rem;
        background-color: #f4f4f4;
        text-align: center;
        line-height: 0.30rem;
        border-radius: 0.03rem;
      }
    }
  }
  .anchor{
    background: #f4f4f4;
  }
}
</style>
