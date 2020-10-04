<template>
  <div class="login">
    <div class="header">
      <van-icon name="arrow-left" class="arrow-left" @click="goMine"/>
      <img src="../../../public/ico.png" alt="">
    </div>
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="手机号"
        label="手机号"
        placeholder="手机号"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="验证码"
        label="验证码"
        placeholder="验证码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: .26rem;">
        <van-button side block type="info" native-type="submit" color='#ff7027'>
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import Vue from 'vue'
import { Form, Field, Button, Icon } from 'vant'

Vue.use(Form)
Vue.use(Field)
Vue.use(Button)
Vue.use(Icon)
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    onSubmit (values) {
      console.log('submit', values)
    },
    goMine () {
      this.$router.push('/mine')
    }
  }
}
</script>

<style lang="less" scoped>
.login{
  background: #fff;
  overflow: hidden;
  position: relative;
  .header{
    margin: 0.8rem 0 0.4rem;
    text-align: center;
    img{
      width: 0.6rem;
      height: 0.6rem;
    }
    .arrow-left{
      position: absolute;
      top: .20rem;
      left: .10rem;
      font-size: .18rem;
      color: #666
    }
  }
}
</style>
