<template>
  <div>
    <div class="ratings" ref="ratings">
      <div class="ratings-content">
        <div class="overview">
          <div class="overview-left">
            <h1 class="score">{{seller.score}}</h1>
            <div class="title">综合评分</div>
            <div class="rank">高于周边商家{{seller.rankRate}}%</div>
          </div>
          <div class="overview-right">
            <div class="score-wrapper">
              <span class="title">服务态度</span>
              <star :size="36" :score="seller.serviceScore"></star>
              <span class="score">{{seller.serviceScore}}</span>
            </div>
            <div class="score-wrapper">
              <span class="title">商品评分</span>
              <star :size="36" :score="seller.foodScore"></star>
              <span class="score">{{seller.foodScore}}</span>
            </div>
            <div class="delivery-wrapper">
              <span class="title">送达时间</span>
              <span class="delivery">{{seller.deliveryTime}}分钟</span>
            </div>
          </div>
        </div>
        <split></split>
        <ratingselect
          :selectType="selectType"
          :onlyContent="onlyContent"
          :desc="desc"
          :ratings="ratings"
          @ratingTypeSelect="ratingTypeSelect"
          @contentToggle="contentToggle"
        ></ratingselect>
        <div class="rating-wrapper">
          <ul>
            <li v-for="rating in ratings" class="rating-item" v-show="needShow(rating.rateType, rating.text)">
              <div class="avatar">
                <img :src="rating.avatar" width="28" height="28">
              </div>
              <div class="content">
                <h1 class="name">{{rating.username}}</h1>
                <div class="star-wrapper">
                  <star :size="24" :score="rating.score"></star>
                  <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟</span>
                </div>
                <p class="text">{{rating.text}}</p>
                <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                  <span class="icon-thumb_up"></span>
                  <span class="item" v-for="item in rating.recommend" :key="item.id">{{item}}</span>
                </div>
                <div class="time">
                  {{rating.rateTime | formatDate}}
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
import BScorll from "better-scroll"
import {formatDate} from 'common/js/date'
import star from "components/goods/star/star";
import ratingselect from "components/goods/ratingselect/ratingselect";
import split from "components/goods/split/split";
const ALL = 2;
const ERR_OK = 0

export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      ratings: [],
      showFlag: false,
      selectType: ALL,
      onlyContent: true,
      desc: {
        all: "全部",
        positive: "推荐",
        negative: "吐槽"
      }
    };
  },
  created(){
    this.$http.get('/api/ratings').then((response)=>{
      response = response.body
      if(response.errno === ERR_OK){
        this.ratings = response.data
        this.$nextTick(()=>{
          this.scroll = new BScorll(this.$refs.ratings,{
          click: true
        })
        })
      }
    })
  },
  methods:{
    ratingTypeSelect(type) {
      this.selectType = type;
      this.$nextTick(()=>{
        this.scroll.refresh()
      })
    },
    contentToggle(onlyContent){
      this.onlyContent = onlyContent
      this.$nextTick(()=>{
        this.scroll.refresh()
      })
    },
    needShow(type,text){
      //判断有内容的评价,按钮勾选了并且没有内容的话返回false
      if(this.onlyContent && !text){
        return false
      }
      //判断是否选择看全部评论，all的话全部返回true
      if(this.selectType ===ALL){
        return true
      }else{
        //判断每条评论的type，当这条评论的type=this.selectType时显示
        return type === this.selectType
      }
    }
  },
  filters:{
    formatDate(time){
      let date = new Date(time)
      return formatDate(date,'yyyy-MM-dd hh:mm')
    }
  },
  components: {
    star,
    ratingselect,
    split
  }
};
</script>
<style lang='stylus' rel='stylesheet/stylus'>
@import './ratings'
</style>
