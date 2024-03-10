<template>
  <q-page padding>
    <main class="row text-white text-center">

      <div :class="['col-12', 'fullscreen']" style="display: flex;flex-direction: column; justify-content: center;">
        <q-btn class="absolute-top-right z-10" flat label="رد کردن" style="color: gray;margin: 7px 7px 0;" />

        <div>
          <h2  :class="[{'text-h4':$q.screen.height > 800},{'text-h5':$q.screen.height <800} , 'text-weight-medium' , 'q-mt-none']">
            ! به روز گفت خوش آمدید
          </h2>
          <p class="text-body2 q-px-md ligatures text-grey">
            :) راه حلی برای زندگی بهتر
          </p>
        </div>

        <div style="position: relative;">
          <q-img :style="{ 'margin': $q.screen.height > 800 ? '30px auto 0px' : '10px auto','filter':'blur(0.7rem)' }"
            :width="$q.screen.height < 800 ? '70%' : '100%'" src="../../assets/avatar.webp" />
          <q-img class=" absolute-center  z-20" :style="{ 'margin': $q.screen.height > 800 ? '30px auto 0px' : '10px auto' }"
            :width="$q.screen.height < 800 ? '70%' : '100%'" src="../../assets/avatar.webp" />
        </div>

        <div class="q-my-md" :style="{ 'margin': $q.screen.height > 800 ? '40px 0px' : '10px 0px' }">
          <swiper-component />
        </div>

        <p :class="[{ 'q-mb-xl': $q.screen.height > 800 }]" style="font-size: 12px;font-weight: 200;">
          شروع سفرتون به سوی حال خوب
        </p>

        <section class="absolute-bottom" style="bottom: 30px;">
          <div style="display: flex; justify-content: center;">
            <div style="width: 7px;height: 7px; border-radius: 50%; background-color: white;"></div>
            <div style="width: 7px;height: 7px; border-radius: 50%; margin: 0px 7px ; background-color: gray;">
            </div>
            <div style="width: 7px;height: 7px; border-radius: 50%; background-color: gray;"></div>
            <div style="width: 7px;height: 7px; border-radius: 50%; margin-left: 7px; background-color: gray;"></div>
          </div>
          <div style="text-align: center;">
            <q-btn flat @click="$router.push('/intro/slogan2')" label="بزن بریم"
              style="background-color: #1BA4FF; color: white;width: 80%;height: 50px;border-radius: 16px;font-size: 16px;font-weight:300;margin-top: 7px;" />
          </div>
        </section>
      </div>

    </main>
  </q-page>
</template>

<script>
import SwiperComponent from 'src/components/SwiperComponent.vue';
import { useQuasar } from "quasar";
export default {
  // name: 'PageName',
  components: {
    SwiperComponent
  },
  setup() {
    const $q = useQuasar()
    $q.screen.setSizes({ sm: 300, md: 500, lg: 1000, xl: 2000 })

    return {}
  }
}
</script>
