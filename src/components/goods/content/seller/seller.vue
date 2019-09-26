<template>
  <div>
    <div class="seller" ref="seller">
      <div class="seller-content">
        <div class="overview">
          <h1 class="title">{{seller.name}}</h1>
          <div class="desc border-1px">
            <star :size="36" :score="seller.score"></star>
            <span class="text">({{seller.ratingCount}})</span>
            <span class="text">月售{{seller.sellCount}}单</span>
          </div>
          <ul class="remake">
            <li class="block">
              <h2>起送价</h2>
              <div class="content">
                <span class="stress">{{seller.minPrice}}</span>元
              </div>
            </li>
            <li class="block">
              <h2>商家配送</h2>
              <div class="content">
                <span class="stress">{{seller.deliveryPrice}}</span>元
              </div>
            </li>
            <li class="block">
              <h2>平均配送时间</h2>
              <div class="content">
                <span class="stress">{{seller.deliveryTime}}</span>分钟
              </div>
            </li>
          </ul>
        </div>
        <split></split>
        <div class="bulletin">
          <h1 class="title">公告与活动</h1>
          <div class="content-wrapper border-1px">
            <p class="content">{{seller.bulletin}}</p>
          </div>
          <ul v-if="seller.supports" class="supports">
            <li class="support-item border-1px" v-for="(item,index) in seller.supports">
              <span class="icon" :class="classMap[seller.supports[index].type]"></span>
              <span class="text">{{seller.supports[index].description}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
import star from "components/goods/star/star";
import split from "components/goods/split/split";
import BScroll from "better-scroll";

export default {
  name: "",
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {};
  },

  components: {
    star,
    split
  },

  computed: {},

  created() {
    this.classMap = ["decrease", "discount", "special", "invoice", "guarantee"];
  },
  watch: {
    'seller'() {
      this._initScroll();
    }
  },
  mounted(){
    this._initScroll()
  },
  methods: {
    _initScroll() {
      if (!this.scroll) {
        this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.seller, {
            click: true
          });
        });
      } else {
        this.$nextTick(() => {
          this.scroll.refresh();
        })
      }
    }
  }
};
</script>
<style lang='stylus' rel='stylesheet/stylus'>
@import './seller'
</style>
