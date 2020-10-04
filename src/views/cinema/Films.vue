<template>
  <div class="films">
    <div class="banner">
      <van-icon name="play" class="arrow"/>
      <div class="bg-img">
        <img :src="url" alt="">
      </div>
      <div class="wrapper" ref="wrapper">
        <ul class="my-swipe"
        ref="mySwipe"
        :style="{'width':getWidth,'transform':movex}"
        v-show="isshow">
          <li class="swipe-item"
          v-for="(item,index) in films"
          :key="index"
          :class="classIndex===index?'big':''"
          @click="getIndex(index,item.poster)">
            <img :src="item.poster" alt="">
          </li>
        </ul>
      </div>
    </div>
    <div class="filmmsg" @click="goFilm(thisFilm.filmId)">
      <div class="f-top">
        <span class="name">{{thisFilm.name}}</span>
        <span class="score">{{thisFilm.grade}}</span>
        <i>分</i>
      </div>
      <div class="f-but">
        <span>
          {{thisFilm.category}}
          {{thisFilm.runtime}}分钟
          {{thisFilm.director}}
        </span>
        <span v-for="(item, index) in thisFilm.actors"
        :key="index">{{item.name}}</span>
      </div>
      <van-icon name="arrow" class="goFilm"/>
    </div>
    <div class="film-nav">
      <van-tabs title-active-color='#ff5f16' line-width='4em' line-height='1' @click="changeClick" v-model='active'>
        <van-tab v-for="(item,index) in thisFilm.showDate"
        :key="index"
        >
          <template #title >{{item | getData }}</template>
        </van-tab>
      </van-tabs>
    </div>
    <transition mode="out-in">
      <Timelist :filmdata='schedule' v-show="show"/>
    </transition>
  </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import { Tab, Tabs } from 'vant'
import Timelist from './Timelist'
// import BScroll from 'better-scroll'
import { mapMutations } from 'vuex'

Vue.use(Tab)
Vue.use(Tabs)
export default {
  components: { Timelist },
  data () {
    return {
      films: [],
      isshow: false,
      translateX: 0,
      width: '',
      url: '',
      classIndex: 0,
      thisFilm: {},
      schedule: '',
      active: 0,
      show: true
    }
  },
  filters: {
    getData: function (val) {
      var month = new Date(val * 1000).getMonth() + 1 + '月'
      var data = new Date(val * 1000).getDate() + '月'
      return month + data
    }
  },
  computed: {
    getWidth () {
      return (this.films.length * 102) / 100 + 'rem'
    },
    movex () {
      return 'translateX(' + this.translateX + 'rem)'
    }
  },
  methods: {
    ...mapMutations(['setFilmId', 'setPathId']),
    changeClick (index) {
      this.schedule.date = this.thisFilm.showDate[index]
      this.schedule.cinemaId = this.$route.params.id
      this.show = false
      setTimeout(() => {
        this.show = true
      }, 0)
      // 父子传参
      // console.log('/api/' + this.thisFilm + tiemId + this.$route.params.id)
    },
    getIndex (index, url) {
      this.translateX = -102 * index / 100
      this.url = url
      this.classIndex = index
      this.thisFilm = this.films[index]
      this.schedule.filmId = this.films[index].filmId
      this.schedule.date = this.thisFilm.showDate[0]
      this.active = 0
      // 控制底部显隐
      this.show = false
      setTimeout(() => {
        this.show = true
      }, 0)
    },
    goFilm (filmId) {
      this.setFilmId(filmId)
      this.setPathId(this.$route.path)
      // this.$store.commit('setPathId', this.$route.path)
      this.$router.push({
        name: 'film',
        params: {
          id: filmId
        }
      })
    }
    // touch () {
    //   var that = this.translateX
    //   var ul = this.$refs.mySwipe
    //   ul.ontouchstart = function (e) {
    //     var start = e.changedTouches[0].pageX
    //     ul.ontouchmove = function (e) {
    //       var ing = e.changedTouches[0].pageX
    //       var sum = parseInt((ing - start) / 102)
    //       if (sum > 0) {
    //         that = 102 * sum / 100
    //       } else {
    //         that = -102 * sum / 100
    //       }
    //       console.log(that)
    //     }
    //   }
    // }
  },
  mounted () {
    // this.touch()
    // this.scroll = new BScroll(this.$refs.wrapper, {
    //   scrollX: true,
    //   useTransform: true,
    //   useTransition: true,
    //   click: true
    // })
  },
  created () {
    axios({
      url: '/api/gateway/?cinemaId=' + this.$route.params.id + '&k=776829',
      headers: {
        'X-Host': 'mall.film-ticket.film.cinema-show-film'
      }
    })
      .then((res) => {
        this.films = res.data.data.films
        this.url = res.data.data.films[0].poster
        this.thisFilm = res.data.data.films[0]
        this.schedule = {
          filmId: res.data.data.films[0].filmId,
          cinemaId: this.$route.params.id,
          date: res.data.data.films[0].showDate[0]
        }
        this.isshow = true
        // console.log(this.schedule)
      })
  }
}
</script>

<style lang="less" scoped>
.films{
  .banner{
    height: 1.6rem;
    width: 3.75rem;
    position: relative;
    overflow: hidden;
    .arrow{
      position: absolute;
      font-size: .18rem;
      color: #fff;
      transform: rotate(-90deg);
      z-index: 999;
      bottom: -.06rem;
      left: 1.8rem;
    }
    .bg-img{
      position: absolute;
      height: 1.6rem;
      width: 3.75rem;
      img{
        width: 100%;
        height: 100%;
        filter: blur(.45rem)
      }
    }
    .wrapper{
      position: relative;
      height: 1.6rem;
      width: 3.75rem;
      .my-swipe{
        position: relative;
        z-index: 10;
        height: 1.04rem;
        overflow: unset;
        top: .40rem;
        left: 1.43rem;
        transition: all 1s;
        .swipe-item{
          float: left;
          width: 0.72rem;
          height: 1.04rem;
          margin: 0  0.15rem;
        }
        .swipe-item.big{
          transform: translateY(-.1rem) scale(1.2);
        }
        img{
          width: 0.72rem;
          height: 1.04rem;
        }
      }
    }
  }
  .filmmsg{
    height: 0.8rem;
    padding: 0.15rem 0;
    position: relative;
    .f-top{
      height: 0.2rem;
      text-align: center;
      margin-bottom: 0.1rem;
      .name{
        font-size: 0.15rem;
        color: #191a1b;
        padding-right: 0.05rem;
      }
      .score{
        font-size: 0.16rem;
        font-style: italic;
        color: #ffb232;
        margin-right: .02rem;
      }
      i{
        font-size: 0.1rem;
        color: #ffb232;
      }
    }
    .f-but{
      text-align: center;
      height: 0.18rem;
      color: #797d82;
      font-size: 0.13rem;
      padding: 0 12%;
      overflow: hidden;
      -o-text-overflow: ellipsis;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .goFilm{
      position: absolute;
      right: 0.1rem;
      top: 0.35rem;
    }
  }
  .film-nav{
    height: 0.49rem;
    line-height: .49rem;
    border-top: 0.01rem solid #eee;
    ul{
      display: flex;
      align-items: center;
      width: 200%;
      li{
        color: #ff5f16;
        font-size: 0.14rem;
        padding: 0px 0.15rem;
        cursor: pointer;
      }
    }
  }
  @keyframes fadeIn {
    0%{opacity: 0; transform: translateX(-50%)} /* v-enter */
    100%{opacity: 1; transform: translateX(0)} /* v-enter-to */
  }
  @keyframes fadeOut {
    0%{opacity: 1; transform: translateX(0)} /* v-leave */
    100%{opacity: 0; transform: translateX(50%)} /* v-leave-to */
  }
  .v-enter-active{
    animation: fadeIn .8s
  }
  .v-leave-active{
    animation: fadeOut .8s
  }
}
</style>
// 电影轮播
// https://m.maizuo.com/gateway/?cinemaId=8119&k=776829
// X-Host: mall.film-ticket.film.cinema-show-film

// 几点场电影
// https://m.maizuo.com/gateway/?filmId=5112&cinemaId=8119&date=1625512800&k=9270114
// X-Host: mall.film-ticket.schedule.list
