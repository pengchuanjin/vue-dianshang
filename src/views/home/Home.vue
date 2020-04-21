<template>
  <div class="home">
    <NavTab class="home-nav">
      <div slot="content">购物街</div>
    </NavTab>
    <scroll
      class="scorll-content"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @scroll="contentScroll"
      @pullingUp="loadMore"
    >
      <!-- 轮播图 -->
      <home-swiper :banners="banners"></home-swiper>
      <!-- 详情面 -->
      <recommends :recommends="recommends"></recommends>
      <!--  -->
      <feature-view></feature-view>
      <tab-control
        :title="['流行', '新款', '精选']"
        class="tab-control"
        @tabClick="tabClick"
      ></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
// 引入的子组件
import HomeSwiper from "./childComponents/HomeSwiper";
import Recommends from "./childComponents/Recommends";
import FeatureView from "./childComponents/FeatureView";
//引入的公共性组件
import NavTab from "@/components/common/navTab/NavTab";
import TabControl from "@/components/content/tabControl/tabControl";
import GoodsList from "@/components/content//goods/GoodsList";
import scroll from "../../components/common/scroll/Scroll";
import backTop from "@/components/content/backTop/backTop";

//调用的接口
import { GetHomeMultidata, GetHomeGoods } from "@/api/home";
export default {
  name: "home",
  components: {
    // 引入的子组件
    HomeSwiper,
    Recommends,
    FeatureView,
    //引入的公共性组件
    NavTab,
    TabControl,
    GoodsList,
    scroll,
    backTop
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop",
      //图标默认不显示
      isShowBackTop: false
    };
  },
  created() {
    //首页的数据
    this.getHomeMultidata();
    //商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    //监听goodsListItem中的图片加载完成
    //千万不要在created(){}中拿$refs
    this.$bus.$on("itemImageLoad", () => {
      this.$refs.scroll.refresh();
    });
  },
  methods: {
    /* 
    获取数据接口的
    */
    //首页的数据
    getHomeMultidata() {
      GetHomeMultidata().then(response => {
        this.banners = response.data.banner.list;
        this.recommends = response.data.recommend.list;
      });
    },
    //  //商品数据
    getHomeGoods(type) {
      let page = this.goods[type].page + 1;
      GetHomeGoods(type, page).then(response => {
        this.goods[type].list.push(...response.data.list);
        this.goods[type].page += 1;
        //汉第二次上拉加载的时候,调用这个函数
        this.$refs.scroll.finishPullUp();
      });
    },
    /*************************************************************************************** */
    /*
     *点击事件
     *
     */
    //点击切换商品数据
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
      }
    },
    //返回顶部
    backTop() {
      this.$refs.scroll.scrollTo(0, 0, 300);
    },
    //backTop小于什么值时,出现
    contentScroll(position) {
      this.isShowBackTop = -position.y > 3000;
    },
    //上拉加载更多
    loadMore() {
      //上拉加载重新获取数据
      this.getHomeGoods(this.currentType);
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  }
};
</script>

<style scoped>
.home {
  /* padding-top: 44px; */
  /* 下面的100vh是视口的高度 */
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  font-weight: 600;
  color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}
.tab-control {
  position: sticky;
  top: 44px;
}
.scorll-content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
/* .scorll-content {
  height: calc(100%-93px);
  overflow: hidden;
  margin-top: 44px;
} */
/*
let total =[]
let num1=[1,12,13,14,15]
let num2=[122,1255,13551455,1555]
第一种方法
for (let n of num1)
total.push(n)
第二种方法
total.push(...num1)
 */
</style>
