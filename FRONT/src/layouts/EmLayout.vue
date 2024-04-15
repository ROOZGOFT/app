<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <router-view v-slot="{ Component }">
        <Transition name="slide-fade">
          <component :is="Component" />
        </transition>
      </router-view>
    </q-page-container>
  </q-layout>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
});
</script>

<style>
.slide-fade-enter-active {
  transition: all 0.1s ease;
}

.slide-fade-leave-active {
  transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(-20px);
  opacity: 0;
}
</style>