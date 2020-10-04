<template>
  <div class="film">
    <div class="header">
      <span class="headarrow" @click="goBack">
        <van-icon name="arrow-left"/>
      </span>
      <h2 class="title" v-show="isShow">{{filmInfo.name}}</h2>
    </div>
    <div class="banner">
      <img :src="filmInfo.poster" alt="">
    </div>
    <div class="cont">
      <div class="name">
        <div class="fl">
          <h2>{{filmInfo.name}}</h2>
          <span v-if="filmInfo.filmType">{{filmInfo.filmType.name}}</span>
        </div>
        <div class="fr">
          <span>{{filmInfo.grade}}</span>
          <i>分</i>
        </div>
      </div>
      <p class="type">{{filmInfo.category}}</p>
      <div class="time">{{getYear}}</div>
      <div class="runtime">{{filmInfo.nation}} | {{filmInfo.runtime}}</div>
      <div class="text"
      :style="textShow?{'height':'1.35rem'}:{'height':'0.38rem'}"
      >{{filmInfo.synopsis}}</div>
      <div class="toggle" >
        <van-icon name="arrow-down"
        @click="showText"
        class="change"
        :class="textShow?'transform':''"/>
      </div>
    </div>
    <div class="actors">
      <div class="title">演职人员</div>
      <div class="picture" ref="picture">
        <ul>
          <li v-for="(item,index) in filmInfo.actors"
          :key="index">
            <img :src="item.avatarAddress" alt="">
            <p class="name">{{item.name}}</p>
            <p class="role">{{item.role}}</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="photos">
      <div class="title">
        <div class="fl">剧照</div>
        <div class="fr" @click="allclick" v-if="filmInfo.photos">全部({{filmInfo.photos.length}}) &gt;</div>
      </div>
      <div class="picItems" ref="picItems">
        <ul class="pic-items"
        :style="filmInfo.photos?{'width':picItemsWidth}:''">
          <li v-for="(picitme,picindex) in filmInfo.photos"
          :key="picindex">
            <img :src="picitme" alt="">
          </li>
        </ul>
      </div>
    </div>
    <van-button type="primary" block
    color='#ff5f16'
    class="bombut">选座购票</van-button>
  </div>
</template>

<script>
import Vue from 'vue'
import { Icon, Button } from 'vant'
import { mapActions, mapGetters, mapState } from 'vuex'
import BScroll from 'better-scroll'

Vue.use(Icon)
Vue.use(Button)
export default {
  data () {
    return {
      isShow: false,
      textShow: false
    }
  },
  methods: {
    ...mapActions({
      filmAxios: 'film/filmAxios'
    }),
    allclick () {
      this.$router.push({
        name: 'photos',
        params: {
          id: this.$route.path,
          photos: this.filmInfo.photos
        }
      })
    },
    goBack () {
      this.$router.push(this.pathId)
    },
    showText () {
      this.textShow = !this.textShow
    },
    handleScroll () {
      var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop > 50) {
        this.isShow = true
      } else {
        this.isShow = false
      }
    }
  },
  computed: {
    ...mapState({
      pathId: 'pathId',
      filmInfo: state => state.film.filmInfo
    }),
    ...mapGetters({
      getYear: 'film/getYear',
      picItemsWidth: 'film/picItemsWidth'
    })
  },
  created () {
    this.filmAxios(this.$route.params.id)
    window.addEventListener('scroll', this.handleScroll)
  },
  mounted () {
    this.scroll = new BScroll(this.$refs.picture, {
      scrollX: true
    })
    this.scroll = new BScroll(this.$refs.picItems, {
      scrollX: true
    })
    // console.log(this.picItemsWidth)
  }
}
</script>

<style lang="less" scoped>
.film{
  background: #f4f4f4;
  padding-bottom: 0.44rem;
  .header{
    height: 0.44rem;
    position: fixed;
    .headarrow{
      position: fixed;
      left: .10rem;
      top: .10rem;
      width: 0.3rem;
      height: 0.3rem;
      background: rgba(255, 255, 255, .5);
      border-radius: 50%;
      text-align: center;
      line-height: 0.3rem;
      font-size: .15rem;
      z-index: 10;
      .van-icon-arrow-left{
        bottom: -.02rem;
      }
    }
    .title{
      height: .44rem;
      line-height: .44rem;
      text-align: center;
      background: #fff;
      font-size: 0.17rem;
      width: 100%;
      position: fixed;
      top: 0;
      left: 0;
    }
  }
  .banner{
    height: 2.11rem;
    overflow: hidden;
    img{
      width: 100%;
    }
  }
  .cont{
    padding: 0.12rem 0.15rem 0.15rem;
    background: #fff;
    overflow: hidden;
    margin-bottom: .10rem;
    .name{
      height: 0.24rem;
      overflow: hidden;
      .fl{
        float: left;
        line-height: .24rem;
        h2{
          font-size: 0.18rem;
          display: inline-block;
          margin-right: 0.07rem;
          text-align: center;
          line-height: .24rem;
        }
        span{
          display: inline-block;
          height: 0.14rem;
          line-height: .14rem;
          width: 0.16rem;
          font-size: 9px;
          text-align: center;
          color: #fff;
          background-color: #d2d6dc;
          border-radius: 0.02rem;
        }
      }
      .fr{
        float: right;
        span{
          color: #ffb232;
          font-size: 0.18rem;
          font-style: italic;
        }
        i{
          color: #ffb232;
          font-size: 0.1rem
        }
      }
    }
    .type{
      font-size: 0.13rem;
      color: #797d82;
      margin-top: 0.04rem;
    }
    .time{
      font-size: 0.13rem;
      color: #797d82;
      margin-top: 0.04rem;
    }
    .runtime{
      font-size: 0.13rem;
      color: #797d82;
      margin-top: 0.04rem;
    }
    .text{
      margin-top: 12px;
      font-size: 0.14rem;
      color: #797d82;
      height: 0.38rem;
      overflow: hidden;
      transition: all .5s;
    }
    .toggle{
      text-align: center;
      font-size: .08rem;
      line-height: .20rem;
    }
    .transform{
      transform:rotate(180deg);
    }
  }
  .actors{
    background: #fff;
    margin-bottom: .10rem;
    .title{
      padding: 0.15rem;
      font-size: 0.16rem;
      text-align: left;
      color: #191a1b;
    }
    .picture{
      height: 1.96rem;
      padding-left: 0.15rem;
      overflow: hidden;
      ul{
        width: 5.5rem;
        li{
          float: left;
          width: 0.85rem;
          margin: 0 .1rem;
          img{
            width: 0.85rem;
            height: 1.17rem;
          }
          .name{
            padding-top: 0.1rem;
            font-size: 0.12rem;
            color: #191a1b;
            line-height: 0.18rem;
            text-align: center;
          }
          .role{
            font-size: 10px;
            color: #797d82;
            text-align: center;
          }
        }
      }
    }
  }
  .photos{
    height: 1.77rem;
    background: #fff;
    overflow: hidden;
    .title{
      height: 0.62rem;
      width: 100%;
      padding: 0.15rem;
      line-height: .32rem;
      .fl{
        float: left;
        font-size: 0.16rem;
        text-align: left;
        color: #191a1b;
      }
      .fr{
        font-size: 0.13rem;
        color: #797d82;
        float: right;
      }
    }
    .picItems{
      overflow: hidden;
      width: 3.75rem;
      .pic-items{
        display: flex;
        padding: 0 0.1rem;
        li{
          margin: .10rem;
          img{
            width: 1.5rem;
            height: 0.62rem;
          }
        }
      }
    }
  }
  .bombut{
    position: fixed;
    bottom: 0;
    left: 0;
  }
}
</style>
