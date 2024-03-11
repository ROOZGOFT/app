import { defineStore } from 'pinia';

export const useAuthData = defineStore('counter', {
  state: () => ({
    email:null
  }),
  // getters: {
  //   doubleCount: (state) => state.counter * 2,
  // },
  // actions: {
  //   increment() {
  //     this.counter++;
  //   },
  // },
});
