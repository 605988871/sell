<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li
          v-for="(item,index) in goods"
          class="menu-item"
          :class="{'current':currentIndex===index}"
          @click="selectMenu(index,$event)"
        >
          <span class="text" border-1px>
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="item in goods" class="food-list food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item border-1px">
              <div class="icon">
                <img width="57" height="57" :src="food.icon" />
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">¥{{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">¥{{food.oldPrice}}</span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shopcart>
  </div>
</template>

<script type='text/ecmascript-6'>
import BScroll from "better-scroll";
import shopcart from "components/goods/shopcart/shopcart"

const ERR_OK = 0;
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      goods: [],
      listHeight: [],
      scrollY: 0
    };
  },
  computed: {
    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i + 1];
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i;
        }
      }
      return 0;
    }
  },
  created() {
    this.classMap = ["decrease", "discount", "special", "invoice", "guarantee"];
    this.$http.get("/api/goods").then(response => {
      response = response.body;
      if (response.errno === ERR_OK) {
        this.goods = response.data;
        this.$nextTick(() => {
          this._initScroll();
          this._calculateHeight();
        });
      }
    });
  },
  methods: {
    selectMenu(index,event){
      //如果派发事件的时候constructed为true，但浏览器是没有这个事件的,
      //所以可以利用constructed的值判断pc还是手机，pc的话return掉
      if(!event._constructed){
        return
      }
      let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')//获取ul的dom
      let el = foodList[index]//<li>数组
      this.foodsScroll.scrollToElement(el,300)//移到index所在的li
    },
    //初始化better-scroll
    _initScroll() {
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        //在手机页面better-scroll会阻止点击事件，所以要加click：true默认派发一个点击事件
        //但在pc是不会阻止，所以pc会触发两次事件，因此用constructed判断，如果pc则return
        click:true
      });
      this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
        //当 probeType 为 1 的时候，会非实时（屏幕滑动超过一定时间后）派发scroll 事件；
        // 当 probeType 为 2 的时候，会在屏幕滑动的过程中实时的派发 scroll 事件；
        // 当 probeType 为 3 的时候，不仅在屏幕滑动的过程中，而且在 momentum 滚动动画运行过程中实时派发 scroll 事件。
        probeType: 3
      });
      //获取scrollY数值，即滚动的位置的y轴坐标
      this.foodsScroll.on("scroll", pos => {
        //因为坐标是负的，所以用Math.abs取正数
        this.scrollY = Math.abs(Math.round(pos.y));
      });
    },
    //计算每一个列表的高度，并加入listHeight数组中
    _calculateHeight() {
      let foodList = this.$refs.foodsWrapper.getElementsByClassName(
        "food-list-hook"
      );
      let height = 0;
      this.listHeight.push(height);
      //foodList.length表示有多少个区块
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    }
  },
  components:{
    shopcart
  }
};
</script>
<style lang='stylus' rel='stylesheet/stylus'>
@import './goods.styl'
</style>