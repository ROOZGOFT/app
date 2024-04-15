<template>
  <q-page padding>
    <!-- content -->
    <main class="row text-white text-center">
      <div class="col-12 fullscreen" style="display: flex;flex-direction: column;justify-content: center;">
        <div class="" style="width: 80%;margin: auto;">
          <h1 class="text-h5" style="margin-bottom: 60px">ورود / عضویت</h1>

          <!-- Email Input -->
          <q-input type="email" v-model="email" ref="emailRef" outlined bg-color="white" color="dark"
            :rules="[val => !!val || 'ایمیل نباید خالی باشه']" style="color: black;font-size: 18px;">
            <template v-slot:prepend>
              <q-icon name="email" />
            </template>
            <template v-slot:append>
              <span style="font-size: 15px;">: ایمیل</span>
            </template>
          </q-input>

          <!-- Checkbox -->
          <div class="q-my-md flex justify-end items-center q-gutter-x-sm">
            <p style="margin: 0px;">شرایط و قوانین را قبول دارم</p>
            <input type="checkbox" v-model="checkCondition" style="transform: scale(1.5);">
          </div>
          <div class="q-mt-lg">
            <q-btn flat @click="send" label="ارسال کد تایید" :loading="loading"
              style="background-color: #1BA4FF; color: white;width: 100%;height: 50px;border-radius: 8px;font-size: 16px;font-weight:300;margin-top: 7px;" />
          </div>
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
import { api } from 'src/boot/axios';

export default {
  // name: 'PageName',
  setup() {
    const q = useQuasar();
    const router = useRouter()
    const appData = useAuthData()
    const { email } = storeToRefs(appData);
    const emailRef = ref(null);
    const loading = ref(false)
    const checkCondition = ref(false);

    function send() {
      loading.value = true
      emailRef.value.validate();
      if (emailRef.value.hasError) {
        return q.notify({
          color: "red",
          position: "top",
          message: "input error"
        })
      } else {
        api.post('api/verify', {
          email: email.value
        })
          .then((res) => {
            console.log(res.data);
            loading.value = false
            q.notify({
              color: "green",
              position: "top",
              message: "کد تایید به ایمیل شما ارسال شد"
            })
            router.push('/auth/confirm')
          })
          .catch(err => {
            console.log(err);
          })
      }

    }

    return {
      email,
      emailRef,
      send,
      loading,
      checkCondition
    }
  }
}
</script>
