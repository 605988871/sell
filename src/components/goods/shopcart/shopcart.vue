<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'highlight':totalCount>0}">
            <i class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></i>
          </div>
          <div class="num" v-show="totalCount>0">{{totalCount}}</div>
        </div>
        <div class="price" :class="{'highlight':totalPrice>0}">¥{{totalPrice}}</div>
        <div class="desc">另需配送费¥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right">
        <div class="pay" :class="payClass">{{payDesc}}</div>
      </div>
    </div>
    <div class="ball-container">
      <div v-for="ball in balls">
        <transition
          name="drop"
          @before-enter="beforeEnter"
          @enter="enter"
          @after-enter="afterEnter"
        >
          <div class="ball" v-show="ball.show">
            <div class="inner inner_hook"></div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
export default {
  name: "",
  props: {
    selectFoods: {
      type: Array, //Array或者object，default是一个函数
      default() {
        return [];
      }
    },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      balls: [
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        }
      ],
      dropBalls: [{}]
    };
  },

  components: {},

  computed: {
    totalPrice() {
      let total = 0;
      this.selectFoods.forEach(food => {
        total += food.price * food.count;
      });
      return total;
    },
    totalCount() {
      let count = 0;
      this.selectFoods.forEach(food => {
        count += food.count;
      });
      return count;
    },
    payDesc() {
      if (this.totalPrice === 0) {
        return `¥${this.minPrice}元起送`;
      } else if (this.totalPrice < this.minPrice) {
        let diff = this.minPrice - this.totalPrice;
        return `还差¥${diff}起送`;
      } else {
        return "去结算";
      }
    },
    payClass() {
      if (this.totalPrice < this.minPrice) {
        return "not-enough";
      } else {
        return "enough";
      }
    }
  },
  methods: {
    drop(el) {
      for (let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i];
        if (!ball.show) {
          ball.show = true
          //ball.el接收按钮el
          ball.el = el
          this.dropBalls.push(ball);
          return;
        }
      }
    },
    beforeEnter(el) {
      //找到所以设为true的小球，el是为小球
      let count = this.balls.length;
      while (count--) {
        let ball = this.balls[count];
        if (ball.show) {
          let pos = ball.el.getBoundingClientRect(); //返回按钮相对于视口偏移的位置
          let x = pos.left - 32; // 点击的按钮与小球（fixed）之间x方向的差值
          let y = -(window.innerHeight - pos.top - 22);
          el.style.display = ""; //设置初始位置前，手动置空，覆盖之前的display：none，使其显示
          el.style.webkitTransform = `translate3d(0,${y}px,0)`; //外层元素做纵向的动画，y是变量
          el.style.transform = `translate3d(0,${y}px,0)`;
          let inner = el.getElementsByClassName('inner_hook')[0]; //内层元素做横向动画,inner-hook（用于js选择的样式名加上-hook，表明只是用                                   //于js选择的，没有真实的样式含义）
          inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
          inner.style.transform = `translate3d(${x}px,0,0)`;
        }
      }
    },
    enter(el) {
      let rf = el.offsetHeight;//触发浏览器重绘
      this.$nextTick(() => {
        //异步执行
        el.style.webkitTransform = 'translate3d(0,0,0)'; //重置回来
        el.style.transform = 'translate3d(0,0,0)';
        let inner = el.getElementsByClassName('inner_hook')[0];
        inner.style.webkitTransform = 'translate3d(0,0,0)';
        inner.style.transform = 'translate3d(0,0,0)';
      });
    },
    afterEnter(el) {
      let ball = this.dropBalls.shift(); //取到做完动画的球，再置为false，即重置，它还可以接着被利用
      if (ball) {
        ball.show = false;
        el.style.display = "none";
      }
    }
  }
};
</script>
<style lang='stylus' rel='stylesheet/stylus'>
@import './shopcart'
</style>