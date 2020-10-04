<template>
  <div class="content">
    <div class="list"
    v-for="(item,index) in filmList"
    :key="index"
    @click="goFilm(item.filmId)">
      <div class="img">
        <img :src="item.poster" alt="">
      </div>
      <div class="cont">
        <div class="titel">
          <span class="tit">{{item.name}}</span>
          <span class="item">{{item.filmType.name}}</span>
        </div>
        <div class="grade">
          <span class="pfen">观众评分</span>
          <span class="score">{{item.grade}}</span>
        </div>
        <p class="msg text_ellipsis">主演：
          <span v-for="(actItem, actIndex) in item.actors" :key="actIndex">
            {{actItem.name}}
          </span>
        </p>
        <div class="time">{{item.nation}} | {{item.runtime}}分钟</div>
      </div>
      <div class="fr">
        {{tabActive-1?'预购':'购票'}}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapState({
      filmList: state => state.home.filmList,
      tabActive: state => state.home.tabActive
    })
  },
  methods: {
    ...mapActions({
      homeAxios: 'home/homeAxios'
    }),
    ...mapMutations({
      setFilmId: 'setFilmId',
      setPathId: 'setPathId'
    }),
    goFilm (filmId) {
      this.setFilmId(filmId)
      this.setPathId(this.$route.path)
      this.$router.push({
        name: 'film',
        params: {
          id: filmId
        }
      })
    }
  },
  created () {
    this.homeAxios()
  }
}
</script>

<style lang="less" scoped>
.content{
  padding-left: .15rem;
  padding-bottom: .5rem;
  .list{
    height: 1.24rem;
    padding: .15rem .15rem .15rem  0;
    border-bottom: .01rem solid #ededed;
    .img{
      width: .66rem;
      height: .94rem;
      float: left;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .cont{
      width: 2.30rem;
      height: .82rem;
      padding: 0 0.1rem;
      float: left;
      .titel{
        height: .22rem;
        line-height: .22rem;
        .tit{
          font-size: .16rem;
          margin-right: .05rem;
        }
        .item{
          font-size: .09rem;
          color: #fff;
          padding: 0 .02rem;
          line-height: .14rem;
          background-color: #d2d6dc;
          border-radius: .02rem;
        }
      }
      .grade{
        height: 0.2rem;
        .pfen{
          font-size: .13rem;
          margin-top: .04rem;
          color: #797d82;
        }
        .score{
          color: #ffb232;
          font-size: .14rem;
        }
      }
      .msg{
        font-size: .13rem;
        margin-top: .04rem;
        color: #797d82;
      }
      .time{
        font-size: .13rem;
        margin-top: .04rem;
        color: #797d82;
      }
    }
    .fr{
      float: left;
      line-height: 0.25rem;
      height: 0.25rem;
      width: 0.4rem;
      color: #ff5f16;
      font-size: 0.13rem;
      text-align: center;
      border-radius: 0.02rem;
      border: 1px solid #ff5f16;
      margin-top: .22rem
    }
  }
}
</style>
