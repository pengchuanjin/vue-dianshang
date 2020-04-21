<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Bscorll from "better-scroll";
export default {
  name: "bettor-scorll",
  data() {
    return {
      scroll: null
    };
  },
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    scrollTo(x, y, time = 500) {
      //要先判断this.scroll &&有没有存在,只要$refs是在mounted中得到了,这里this.scroll可以不加
      this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.scroll.finishPullUp();
    },
    refresh() {
      this.scroll.refresh();
    }
  },
  mounted() {
    //创建Bscorll对象
    this.scroll = new Bscorll(this.$refs.wrapper, {
      /*
      类型：Number
      默认值：0
      可选值：1、2、3
      作用：有时候我们需要知道滚动的位置。当 probeType 为 1 的时候，会非实时（屏幕滑动超过一定时间后）派发scroll 事件；
      当 probeType 为 2 的时候，会在屏幕滑动的过程中实时的派发 scroll 事件；
      当 probeType 为 3 的时候，不仅在屏幕滑动的过程中，而且在 momentum 滚动动画运行过程中实时派发 scroll 事件。 
       */
      probeType: this.probeType,
      click: true,
      /* 类型：Boolean | Object
      *默认值：false
      *作用：这个配置用于做上拉加载功能，默认为 false。当设置为 true 或者是一个 Object 的时候
      可以开启上拉加载，可以配置离底部距离阈值（threshold）来决定开始加载的时机，见 Demo 。了解更多的细节可以去看
      example 中的 scroll 组件代码。
       */
      pullUpLoad: this.pullUpLoad
    });
    //监听滚动的位置
    this.scroll.on("scroll", position => {
      this.$emit("scroll", position);
    });
    this.scroll.on("pullingUp", () => {
      this.$emit("pullingUp");
    });
  }
};
</script>

<style scoped></style>
