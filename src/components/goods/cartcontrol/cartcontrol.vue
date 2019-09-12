<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease" v-show="food.count>0" @click="decreaseCart">
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click="addCart"></div>
  </div>
</template>

<script type='text/ecmascript-6'>
import Vue from "vue";

export default {
  name: "",
  props: {
    food: {
      type: Object
    }
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    addCart(event) {
      if (!event._constructed) {
        return;
      }
      if (!this.food.count) {
        Vue.set(this.food, "count", 1);
      } else {
        this.food.count++;
      }
      this.$emit('add',event.target)//将dom传给父组件，在<cartcontrol></cartcontrol>用@add接收
    },
    decreaseCart() {
      if (!event._constructed) {
        return;
      }
      if (this.food.count) {
        this.food.count--;
      }
    }
  }
};
</script>
<style lang='stylus' rel='stylesheet/stylus'>
@import './cartcontrol'
</style>