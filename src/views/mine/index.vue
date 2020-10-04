<template>
  <div class="mine">
    <div class="header">
      <div><img src="" alt=""></div>
      <span @click="loginClick">立即登录</span>
    </div>
    <div class="cont">
      <div class="movie">
        <van-icon name="coupon-o" size='2em' color='#f7c234' class="icon"/>
        电影订单
      </div>
      <div class="movie">
        <van-icon name="orders-o" size='2em' color='#c4da54' class="icon"/>
        商品订单
      </div>
    </div>
    <div class="nav">
      <van-cell v-for="(item, index) in list"
      :key="index"
      size="large"
      >
        <template #title>
          <van-icon :name="item.icon" :color='item.color' size="1.5em" class="icon"/>
          <span class="custom-title">{{item.title}}</span>
        </template>
        <template #right-icon>
          <van-icon name="arrow"/>
        </template>
      </van-cell>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Cell, CellGroup } from 'vant'

Vue.use(Cell)
Vue.use(CellGroup)
export default {
  data () {
    return {
      list: [{ icon: 'credit-pay', title: '卖座券', color: '#e3c3b4' },
        { icon: 'bill-o', title: '组合红包', color: '#dbd3c8' },
        { icon: 'balance-o', title: '余额', color: '#fabd6d' },
        { icon: 'setting-o', title: '设置', color: '#d7e495' }]
    }
  },
  methods: {
    loginClick () {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
.mine{
  background: #ccc;
  .header{
    height: 3.75rem;
    height: 2rem;
    background: url(../../assets/images/bg.png) no-repeat;
    background-size: cover;
    display: flex;
    align-items: center;
    padding: 0.64rem 0 0 .22rem;
    margin-top: -44px;
    div{
      height: 0.67rem;
      width: 0.67rem;
      border: 1px solid #ccc;
      margin-right: 0.2rem;
      border-radius: 50%;
      background: #Fff url(../../assets/images/icon.png) no-repeat;
      background-size: cover;
    }
    span{
      font-size: 0.16rem;
      color: #fff;
    }
  }
  .cont{
    display: flex;
    background: #fff;
    justify-content: center;
    height: .79rem;
    align-items: center;
    .movie{
      color: #797d82;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 0 .6rem;
      .icon{
        margin-bottom: .05rem;
      }
    }
  }
  .nav{
    .icon{
      position: relative;
      top: .05rem;
      margin-right: .05rem
    }
  }
}
</style>
