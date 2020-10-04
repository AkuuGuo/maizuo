<template>
  <div class="cinama">
    <div class="header">
      <div class="return">
        <van-icon name="arrow-left" @click="backclick"/>
      </div>
      <h2 class="title">{{cinemaInfo.name}}</h2>
      <div class="tags">
        <span
        v-for="(item,index) in cinemaInfo.services"
        :key="index">{{item.name}}</span>
        <van-icon name="arrow" color='#ffb232'/>
      </div>
      <div class="address">
        <span class="gps">
          <van-icon name="location-o" />
        </span>
        <span class="ads text_ellipsis">
          {{cinemaInfo.address}}
        </span>
        <span class="phone">
          <van-icon name="phone-o" />
        </span>
      </div>
    </div>
    <Films/>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import { Icon } from 'vant'
import Films from './Films'

Vue.use(Icon)
export default {
  components: { Films },
  data () {
    return {
      cinemaInfo: ''
    }
  },
  methods: {
    backclick () {
      this.$router.push('/cinema')
    }
  },
  mounted () {
    axios({
      url: '/api/gateway/?cinemaId=' + this.$route.params.id,
      headers: {
        'X-Host': 'mall.film-ticket.cinema.info'
      }
    })
      .then((res) => {
        this.cinemaInfo = res.data.data.cinema
      })
  }
}
</script>

<style lang="less" scoped>
.cinama{
  .header{
    .return{
      height: .44rem;
      text-align: left;
      font-size: .18rem;
      line-height: .44rem;
      padding-left: .10rem;
    }
    .title{
      line-height: .44rem;
      text-align: center;
      font-size: .18rem;
    }
    .tags{
      text-align: center;
      display: flex;
      justify-content: center;
      margin: 0.05rem 0 0.15rem;
      span{
        height: .14rem;
        line-height: .14rem;
        padding: 0 .02rem;
        text-align: center;
        border: .01rem solid #ffb232;
        color: #ffb232;
        font-size: 0.1rem;
        margin: 0 .05rem;
        border-radius: .02rem;
      }
    }
    .address{
      height: 0.5rem;
      line-height: 0.5rem;
      font-size: 0.14rem;
      padding-left: 0.17rem;
      display: flex;
      align-items: center;
      .gps{
        font-size: 0.24rem;
        color: #333;
        position: relative;
        bottom: -.02rem;
      }
      .ads{
        width: 2.77rem;
        color: #333;
        margin: 0 .1rem;
      }
      .phone{
        color: #333;
        font-size: 0.24rem;
        position: relative;
        bottom: -.02rem;
      }

    }
  }
}
</style>
