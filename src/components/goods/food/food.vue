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
        </div>
      </div>
    </transition>
  </div>
</template>

<script type='text/ecmascript-6'>
import BScorll from "better-scroll";
import Vue from "vue";
import cartcontrol from "components/goods/cartcontrol/cartcontrol";
import split from "components/goods/split/split"
export default {
  name: "",
  props: {
    food: {
      type: Object
    }
  },
  data() {
    return {
      showFlag: false
    };
  },

  components: {
    cartcontrol,
    split
  },

  computed: {},

  watch: {},

  beforeMount() {},

  mounted() {},

  methods: {
    show() {
      this.showFlag = true;
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
    }
  }
};
</script>
<style lang='stylus' rel='stylesheet/stylus'>
@import './food'
</style>
