<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container class="container">
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { ref } from 'vue'

export default {
  // name: 'LayoutName',

  setup() {


    return {

    }
  }
}
</script>

<style>
body {
  background-color: #000e1a;
  
}
</style>
