<template>
  <section style="margin: 10px 0px;">
    <swiper :slidesPerView="5" :autoplay="{ delay: 1500, disableOnInteraction: false, }" :spaceBetween="15" :loop="true"
      :navigation="false" :modules="modules" class="mySwiper">
      <swiper-slide>خشم</swiper-slide>
      <swiper-slide>تصمیم</swiper-slide><swiper-slide>کنترل</swiper-slide>
      <swiper-slide>خواب</swiper-slide><swiper-slide>مدیتیشن</swiper-slide>
      <swiper-slide>اضطراب</swiper-slide><swiper-slide>استرس</swiper-slide>
      <swiper-slide>بهبود </swiper-slide><swiper-slide>آرامش</swiper-slide>
    </swiper>
  </section>
</template>

<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';

import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

export default {
  name: 'SwiperComponent',
  components: {
    Swiper,
    SwiperSlide,
  },

  setup() {
    return {
      modules: [Pagination, Navigation, Autoplay],
    };
  }
}
</script>
