<template>
  <div class="content">
    <ul>
      <li v-for="(item, index) in cinemas"
      :key="index"
      @click="Cinemainfo(item.cinemaId)">
        <div class="fl">
          <h2 class="text_ellipsis">{{item.name}}</h2>
          <p class="text_ellipsis">{{item.address}}</p>
        </div>
        <div class="fr">
          <div class="price">
            <i>￥</i>
            <span>{{item.lowPrice | price}}</span>
            <i>起</i>
          </div>
          <p>距离未知</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
    }
  },
  filters: {
    price: function (data) {
      return (data / 100).toFixed(1)
    }
  },
  computed: {
    ...mapState({
      cinemas: state => state.cinema.cinemas
    })
  },
  methods: {
    ...mapActions({
      cinemaAxios: 'cinema/cinemaAxios'
    }),
    Cinemainfo (cinemaid) {
      this.$router.push('/cinema/' + cinemaid)
    }
  },
  created () {
    this.cinemaAxios()
  }
}
</script>

<style lang="less" scoped>
.content{
  padding: 0.9rem 0 0.5rem;
  ul{
    li{
      padding: 0.15rem;
      height: .75rem;
      border-bottom: .01rem solid #ededed;
      .fl{
        width: 2.8rem;
        float: left;
        h2{
          line-height: .22rem;
          font-size: .15rem;
          width: 2.12rem;
        }
        p{
          font-size: .12rem;
          color: #797d82;
          width: 2.12rem;
        }
      }
      .fr{
        float: right;
        .price{
          i{
            font-size: .11rem;
            color: #ff5f16;
          }
          span{
            color: #ff5f16;
            font-size: 0.15rem;
            margin: 0 .02rem
          }
        }
        p{
          font-size: 0.11rem;
          color: #797d82;
        }
      }
    }
  }
}
</style>
