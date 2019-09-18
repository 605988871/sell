<template>
  <div>
    <transition name="move">
      <div v-show="showFlag" class="food" ref="food">
        <div class="food-content">
          <div class="image-header">
            <img :src="food.image" />
            <div class="back" @click="hide">
              <i class="icon-arrow_lift"></i>
            </div>
          </div>
          <div class="content">
            <h1 class="title">{{food.name}}</h1>
            <div class="detail">
              <span class="sell-count">月售{{food.sellCount}}份</span>
              <span class="rating">好评率{{food.rating}}</span>
            </div>
            <div class="price">
              <span class="now">¥{{food.price}}</span>
              <span class="old" v-show="food.oldPrice">¥{{food.oldPrice}}</span>
            </div>
            <div class="cartcontrol-wrapper">
              <cartcontrol :food="food" @add="addFood"></cartcontrol>
            </div>
            <!-- 因为el会被隐藏，取不到这个el位置，所以加个动画，延长消失时间，使el消失之前获得这个按钮位置 -->
            <transition name="fade">
              <div
                @click.stop.prevent="addFirst"
                class="buy"
                v-show="!food.count||food.count===0"
              >加入购物车</div>
            </transition>
          </div>
          <split></split>
          <div class="info" v-show="food.info">
            <h1 class="title">商品信息</h1>
            <p class="text">{{food.info}}</p>
          </div>
          <split></split>
          <div class="rating">
            <h1 class="title">商品评价</h1>
            <ratingselect
              :selectType="selectType"
              :OnlyContent="onlyContent"
              :desc="desc"
              :ratings="food.ratings"
              @ratingTypeSelect="ratingTypeSelect"
              @contentToggle="contentToggle"
            ></ratingselect>
            <div class="rating-wrapper">
              <ul v-show="food.ratings && food.ratings.length">
                <li
                  v-show="needShow(rating.rateType,rating.text)"
                  v-for="rating in food.ratings"
                  class="rating-item"
                >
                  <div class="user">
                    <span class="name">{{rating.username}}</span>
                    <img class="avatar" width="12" height="12" :src="rating.avatar" />
                  </div>
                  <div class="time">{{rating.rateTime | formatDate}}</div>
                  <p class="text">
                    <span
                      :class="{'icon-thumb_up':rating.rateType===0,
                    'icon-thumb_down':rating.rateType===1}"
                    ></span>
                    {{rating.text}}
                  </p>
                </li>
              </ul>
              <div class="no-rating" v-show="!food.ratings||!food.ratings.length">暂无评论</div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type='text/ecmascript-6'>
import BScorll from "better-scroll";
import Vue from "vue";
import {formatDate} from 'common/js/date'
import cartcontrol from "components/goods/cartcontrol/cartcontrol";
import ratingselect from "components/goods/ratingselect/ratingselect";
import split from "components/goods/split/split";

const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;

export default {
  name: "",
  props: {
    food: {
      type: Object
    }
  },
  data() {
    return {
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

  components: {
    cartcontrol,
    split,
    ratingselect
  },

  computed: {},

  watch: {},

  beforeMount() {},

  mounted() {},

  filters:{
    formatDate(time){
      let date = new Date(time)
      return formatDate(date,'yyyy-MM-dd hh:mm')
    }
  },

  methods: {
    show() {
      this.showFlag = true;
      this.selectType = ALL;
      this.onlyContent = false;
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScorll(this.$refs.food, {
            click: true
          });
        } else {
          this.scroll.refresh();
        }
      });
    },
    hide() {
      this.showFlag = false;
    },
    addFirst(event) {
      if (!event._constructed) {
        return;
      }
      this.$emit("add", event.target);
      Vue.set(this.food, "count", 1);
    },
    addFood(target) {
      //跟add关联的addFood方法
      this.$emit("add", target); //触发当前实例food上的事件add(在goods组件上绑定在food组件的add方法)
    },
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
      //判断有内容的评价
      if(this.onlyContent && !text){
        return false
      }
      //判断是否选择看全部评论
      if(this.selectType ===ALL){
        return true
      }else{
        //判断每条评论的type，当这条评论的type=this.selectType时显示
        return type === this.selectType
      }
    }
  }
};
</script>
<style lang='stylus' rel='stylesheet/stylus'>
@import './food'
</style>
