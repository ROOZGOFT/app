<template>
  <q-page padding>
    <!-- content -->
    <main class="row text-white text-center">
      <div class="col-12 fullscreen" style="display: flex;flex-direction: column;justify-content: center;">
        <div class="text-center q-gutter-y-md" style="width: 80%;margin: auto;">
          <h1 class="text-h4">کد تایید</h1>

          <div class="q-gutter-x-md" style="display: flex;justify-content: center;">
            <input class="text-h4" bg-color=white v-model="digits[0]" @keyup="handleKeyUp($event, 0)" maxlength="1"
              style="width: 25%;" />
            <input class="text-h4" bg-color=white v-model="digits[1]" @keyup="handleKeyUp($event, 1)" maxlength="1"
              style="width: 25%;" />
            <input class="text-h4" bg-color=white v-model="digits[2]" @keyup="handleKeyUp($event, 2)" maxlength="1"
              style="width: 25%;" />
            <input class="text-h4" bg-color=white v-model="digits[3]" @keyup="handleKeyUp($event, 3)" maxlength="1"
              style="width: 25%;" />
            <input class="text-h4" bg-color=white v-model="digits[4]" @keyup="handleKeyUp($event, 4)" maxlength="1"
              style="width: 25%;" />
            <!-- <button @click="submitForm" :disabled="!isFormValid">Submit</button> -->
          </div>

          <q-btn label="ارسال دوباره کد" />

          <!-- Next -->
          <div>
            <q-btn flat @click="authenticate" label="ورود" :loading="loading"
              style="background-color: #1BA4FF; color: white;width: 100%;height: 50px;border-radius: 8px;font-size: 16px;font-weight:300;margin-top: 7px;" />
          </div>

          <div>
            <q-btn label="اصلاح شماره تلفن" />
          </div>

        </div>


      </div>
    </main>
  </q-page>
</template>

<script>
import { onMounted, ref, computed } from 'vue';
import { storeToRefs } from "pinia";
import { useAuthData } from "stores/authData";
import { useRouter } from "vue-router";
import { event, useQuasar } from "quasar";
import { api } from 'src/boot/axios';

export default {
  // name: 'PageName',
  setup() {
    const q = useQuasar()
    const router = useRouter();
    const authData = useAuthData()
    const { email } = storeToRefs(authData);
    const verificationCode = ref(null)
   
    const loading = ref(false)
    let password = null

    let digits = ref(['', '', '', '', '']);
    const isValidDigit = ref([false, false, false, false, false]);

    onMounted(() => {
      if (!email.value) {
        return router.back();
      }
    })

    const validateDigit = (index) => {
      const digit = digits.value[index];
      isValidDigit.value[index] = /^\d$/.test(digit);
    };

    const handleKeyUp = (event, index) => {
      if (event.key === 'Backspace' && index > 0 && digits.value[index].length === 0) {
        digits.value[index - 1] = '';
        const prevInput = document.querySelector(`input:nth-child(${index})`);
        if (prevInput) {
          prevInput.focus();
        }
      } else if (event.key !== 'Backspace') {
        moveToNext(index);
      }
    };

    const moveToNext = (index) => {
      const nextIndex = index + 1;
      if (nextIndex < digits.value.length && digits.value[index].length === 1) {
        const nextInput = document.querySelector(`input:nth-child(${nextIndex + 1})`);
        if (nextInput) {
          nextInput.focus();
        }
      }
    };

    const isFormValid = computed(() => {
      return isValidDigit.value.every(valid => valid);
    });

    function authenticate() {
      password = digits.value.join("");
      loading.value = true

      

      api.post('api/authenticate', {
        email: email.value,
        verifyCode: password
      })
        .then((res) => {
          console.log(res.data);
          loading.value = false
          if (res.data.access_token) {
            q.cookies.set('access_token', res.data.access_token, { expires: '365d' });
            q.cookies.set('refresh_token', res.data.refresh_token, { expires: '365d' });
            q.cookies.set('expires_in', res.data.expires_in, { expires: '365d' });
            q.notify({
              icon: "done_all",
              color: "green",
              position: "top",
              message: "وارد شدید"
            })
            router.push('/')
          }
        })
        .catch(error => {
          console.log(error);
        })
    }

    return {
      verificationCode,
      authenticate,
      validateDigit,
      loading,
      handleKeyUp,
      isFormValid,
      digits
    }
  }
}
</script>