<template>
  <div class="photo">
    <div class="header">
      <van-icon name="arrow-left" @click="backclick"/>
      剧照（{{photos.length}}）
    </div>
    <div class="photos">
      <ul>
        <li v-for="(item,index) in photos"
        :key="index">
          <img :src="item" alt="">
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Icon } from 'vant'

Vue.use(Icon)
export default {
  data () {
    return {
      path: '',
      photos: []
    }
  },
  methods: {
    backclick () {
      this.$router.push(this.path)
    }
  },
  mounted () {
    this.photos = this.$route.params.photos
    this.path = this.$route.params.id
  }
}
</script>

<style lang="less" scoped>
.photo{
  .header{
    height: 0.44rem;
    text-align: center;
    line-height: .44rem;
    font-size: .18rem;
    .van-icon-arrow-left{
      position: absolute;
      left: 0.1rem;
      top: 0.14rem;
    }
  }
  .photos{
    ul{
      width: 3.75rem;
      display: flex;
      flex-wrap: wrap;
      li{
        margin-right: .01rem;
        margin-bottom: .01rem;
        img{
          width: 1.24rem;
          height: 1.24rem;
        }
      }
    }
  }
}
</style>
