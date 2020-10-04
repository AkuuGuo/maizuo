<template>
  <div class="tiemlist">
    <ul>
      <li v-for="(item,index) in schedule"
      :key="index">
        <div class="fl">
          <span class="start">{{new Date( item.showAt*1000 ).getHours()}}:{{new Date( item.showAt*1000 ).getMinutes()}}</span>
          <span class="end">{{new Date( item.endAt*1000 ).getHours()}}:{{new Date( item.endAt*1000 ).getMinutes()}}散场</span>
        </div>
        <div class="ft">
          <span class="type">{{item.filmLanguage}}{{item.imagery}}</span>
          <span class="room text_ellipsis">{{item.hallName}}</span>
        </div>
        <div class="fr">
          <div class="price">
            <i>￥</i>
            <span>{{item.salePrice / 100}}</span>
          </div>
          <div class="buy">购票</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  props: ['filmdata'],
  data () {
    return {
      schedule: '',
      obj: {}
    }
  },
  watch: {
    filmdata: {
      handler: function (newValue) {
        this.obj = newValue
        // console.log(this.obj)
        axios({
          url: '/api/gateway/?filmId=' + this.obj.filmId + '&cinemaId=' + this.obj.cinemaId + '&date=' + this.obj.date,
          headers: {
            'X-Host': 'mall.film-ticket.schedule.list'
          }
        })
          .then((res) => {
            this.schedule = res.data.data.schedules
            // console.log(this.schedule)
          })
      },
      deep: true
    }
  }
}
</script>

<style lang="less" scoped>
.tiemlist{
  height: 2.0rem;
  overflow: auto;
  ul{
    li{
      height: 0.74rem;
      padding: 0.15rem;
      background: #fff;
      .fl{
        float: left;
        width: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .start{
          font-size: 0.15rem;
          color: #191a1b;
        }
        .end{
          font-size: 0.13rem;
          color: #797d82;
          margin-top: 0.02rem;
        }
      }
      .ft{
        float: left;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .type{
          font-size: 0.15rem;
          color: #191a1b;
          overflow: hidden;
          -o-text-overflow: ellipsis;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .room{
          font-size: 0.13rem;
          color: #797d82;
          margin-top: 0.02rem;
          overflow: hidden;
          width: 1rem;
          -o-text-overflow: ellipsis;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .fr{
        float: right;
        padding: 0.1rem 0;
        line-height: 0.25rem;
        color: #ff5f16;
        .price{
          float: left;
          padding-right: 0.2rem;
          font-size: 0.15rem;
          i{
            font-size: 0.1rem;
            color: #ff5f16;
          }
          span{
            color: #ff5f16;
          }
        }
        .buy{
          float: left;
          height: 0.25rem;
          width: 0.5rem;
          border-radius: 0.02rem;
          position: relative;
          text-align: center;
          border: 1px solid #ff5f16;
        }
      }
    }
  }
}
</style>
