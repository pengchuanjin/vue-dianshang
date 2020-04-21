<template>
  <div class="home-swiper">
    <Swiper ref="mySwiper" :options="swiperOptions">
      <SwiperSlide v-for="(item,index) in banners" :key="index">
        <a :href="item.link">
          <img :src="item.image" width="100%" />
        </a>
      </SwiperSlide>
      <div class="swiper-pagination" slot="pagination"></div>
    </Swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide, directive } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
export default {
  name: "HomeSwiper",
  components: {
    Swiper,
    SwiperSlide
  },
  directives: {
    swiper: directive
  },
  props: {
    banners: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      swiperOptions: {
        pagination: {
          el: ".swiper-pagination"
        },
        loop: true,
        autoplay: true
        // Some Swiper option/callback...
      }
    };
  }
};
</script>

<style scoped>
</style>