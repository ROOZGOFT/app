<template>
  <q-page padding>
    <!-- content -->
    <main class="row text-white text-center">
      <div class="col-12 fullscreen" style="display: flex;flex-direction: column;justify-content: center;">
        <div class="text-right q-gutter-y-md" style="width: 80%;margin: auto;">
          <h1 class="text-h4">ورود / عضویت</h1>
          <p>: ایمیل</p>
          <q-input v-model="email" ref="emailRef" outlined bg-color="white" color="dark"
            :rules="[val => !!val || 'ایمیل نباید خالی باشه', val => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val) || 'فرمت ایمیل اشتباه است']"
            placeholder="example@info.com" style="color: black;font-size: 18px;" />

        </div>
        <div class="absolute-bottom" style="bottom: 30px;">
          <q-btn flat @click="send" label="ارسال کد تایید"
            style="background-color: #1BA4FF; color: white;width: 80%;height: 50px;border-radius: 16px;font-size: 16px;font-weight:300;margin-top: 7px;" />
        </div>
      </div>
    </main>
  </q-page>
</template>

<script>
import { ref } from 'vue';
import { useAuthData } from "stores/authData";
import { storeToRefs } from "pinia";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";

export default {
  // name: 'PageName',
  setup() {
    const q = useQuasar();
    const router = useRouter()
    const appData = useAuthData()
    const { email } = storeToRefs(appData);
    const emailRef = ref(null);

    function send() {
      emailRef.value.validate();
      if (emailRef.value.hasError) {
        return q.notify({
          color: 'red',
          position: 'top',
          message: 'input error'
        })
      } else {
        router.push('/auth/confirm')
      }

    }

    return {
      email,
      emailRef,
      send
    }
  }
}
</script>
