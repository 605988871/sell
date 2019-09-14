<template>
  <div>
    <transition name="move">
      <div v-show="showFlag" class="food">
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
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type='text/ecmascript-6'>
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

  components: {},

  computed: {},

  watch: {},

  beforeMount() {},

  mounted() {},

  methods: {
    show() {
      this.showFlag = true;
    },
    hide() {
      this.showFlag = false;
    }
  }
};
</script>
<style lang='stylus' rel='stylesheet/stylus'>
@import './food'
</style>
