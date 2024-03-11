<template>
  <q-page padding>
    <!-- content -->
    <main class="row text-white text-center">
      <div class="col-12 fullscreen" style="display: flex;flex-direction: column;justify-content: center;">
        <div class="text-right q-gutter-y-md" style="width: 80%;margin: auto;">
          <h1 class="text-h4">تایید ایمیل</h1>
          <p>: کد تایید</p>
          <q-input outlined bg-color="white" color="dark" v-model="verificationCode" ref="verificationCodeRef"
            :rules="[val => !!val || 'کد تایید نباید خالی باشه', (val) => /^-?\d*\.?\d+$/.test(val) || 'فقط عدد وارد کنید']"
            placeholder="" style="color: black;font-size: 18px;" />

        </div>
        <div class="absolute-bottom" style="bottom: 30px;">
          <q-btn flat @click="$router.push('/intro/slogan2')" label="ورود"
            style="background-color: #1BA4FF; color: white;width: 80%;height: 50px;border-radius: 16px;font-size: 16px;font-weight:300;margin-top: 7px;" />
        </div>
      </div>
    </main>
  </q-page>
</template>

<script>
import { onMounted, ref } from 'vue';
import { storeToRefs } from "pinia";
import { useAuthData } from "stores/authData";
import { useRouter } from "vue-router";

export default {
  // name: 'PageName',
  setup() {
    const router = useRouter();
    const authData = useAuthData()
    const { email } = storeToRefs(authData);
    const verificationCode = ref(null)
    const verificationCodeRef = ref(null)

    onMounted(() => {
      if (!email) {
        return router.back();
      }
    })

    return {
      verificationCode,
      verificationCodeRef
    }
  }
}
</script>