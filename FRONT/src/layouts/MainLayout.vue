<template>
  <q-layout view="hHh lpR fFf">

    <q-header class=" bg-transparent">
      <q-toolbar style="display: flex;justify-content: space-between; align-items: center;">

        <q-btn outline icon="inbox" @click="$router.push('/direct')" />

        <q-btn @click="changeTheme" outline icon="dark_mode" />

        <div class="q-gutter-x-sm q-my-none" style="display: flex;">
          <p class="q-my-none">{{ titleTime.year }}</p>
          <p class="q-my-none">{{ titleTime.currentMonth }}</p>
          <p class="q-my-none">{{ titleTime.day }}</p>
          <p class="q-mx-sm q-my-none">|</p>
          <p class="q-my-none">{{ titleTime.dayName }}</p>
        </div>

        <q-btn outline icon="dashboard" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer  class="bg-grey-8 text-white">
      <q-toolbar class="footer" style="display: flex;justify-content: space-between;align-items: center;">

        <q-btn flat>
          <q-avatar>
            <img src="../assets/Home.svg" alt="Home">
          </q-avatar>
        </q-btn>
        
        <q-btn flat>
          <q-avatar>
            <img src="../assets/Course.svg" alt="course">
          </q-avatar>
        </q-btn>
        
        <q-btn flat>
          <q-avatar>
            <img src="../assets/Rooz.svg" alt="rooz">
          </q-avatar>
        </q-btn>
        
        <q-btn flat>
          <q-avatar>
            <img src="../assets/Test.svg" alt="test">
          </q-avatar>
        </q-btn>
        
        <q-btn flat>
          <q-avatar>
            <img src="../assets/Profile.svg" alt="Profile">
          </q-avatar>
        </q-btn>
        
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script>
import { defineComponent, ref, watch } from 'vue'
import moment from "jalali-moment";
import { useQuasar } from "quasar";

export default defineComponent({
  name: 'MainLayout',

  components: {},

  setup() {
    const q = useQuasar();

    // initial jalali-moment
    const faTime = moment().locale('fa').format('YYYY/M/D');
    const today = moment();

    // Get the day of the week (0-6)
    const dayOfWeek = today.day();

    // Array to store the names of the days and month
    const daysOfWeek = ["یک‌شنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنج‌شنبه", "جمعه", "شنبه"];
    const monthOfYear = ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"]

    // Get the name of the day , month , year
    const timeArray = faTime.split("/")

    // store time types in object
    const titleTime = {
      year: timeArray[0],
      month: timeArray[1],
      day: timeArray[2],
      currentMonth: monthOfYear[timeArray[1] - 1],
      dayName: daysOfWeek[dayOfWeek]
    }

    // toggle dark mode
    function changeTheme() {
      q.dark.toggle()
    }

    return {
      titleTime,
      changeTheme
    }
  }
})
</script>
