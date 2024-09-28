<template>
  <div class = "login-container">
    <h1>ログイン</h1>
    <form @submit.prevent = "login">
      <div class = "form-group">
        <label for = "userIdentifier">ユーザー名もしくはメールアドレス</label>
        <input
            type = "text"
            id = "userIdentifier"
            v-model="userIdentifier"
            :class = "{ 'is-invalid': userIdentifierError }"
        />
        <span v-if = "userIdentifierError" class = "error-message">{{ userIdentifierError }}</span>
      </div>

      <div class="form-group">
        <label for="password">パスワード</label>
        <input
            type="password"
            id="password"
            v-model="password"
            :class="{ 'is-invalid': passwordError }"
        />
        <span v-if="passwordError" class="error-message">{{ passwordError }}</span>
      </div>

      <button type="submit">ログイン</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import LoginService, {LoginRequest, LoginResponse} from "@/sevices/LoginService";
import router from '@/router';
import { useToast } from 'vue-toastification'

export default defineComponent({
  setup() {
    const userIdentifier = ref<string>('');
    const password = ref<string>('');
    const userIdentifierError = ref<string>('');
    const passwordError = ref<string>('');
    const emailError = ref<string>('');
    const toast = useToast();

    const validateForm = (): boolean => {
      debugger
      let valid = true;

      if (!userIdentifier.value) {
        userIdentifierError.value = 'ユーザー名もしくはメールアドレスを入力してください。';
        valid = false;
      }

      if (!password.value) {
        passwordError.value = 'パスワードを入力して下さい。';
        valid = false;
      }

      return valid;
    };

    const clearErrors = (): void => {
      userIdentifierError.value = '';
      passwordError.value = '';
      emailError.value = '';
    };

    const login = async (): Promise<void> => {
      clearErrors();
      if (validateForm()) {
        try {
          const req: LoginRequest = {
            userIdentifier: userIdentifier.value,
            password: password.value
          }
          const res: LoginResponse = await LoginService.login(req);

          localStorage.setItem('userId', res.userId.toString());
          localStorage.setItem('token', res.token);

          await router.push('/');
        }
        catch (error) {
          //TODO エラーハンドリング
          errorToast();
          console.error(error);
        }
      }
    };

    const errorToast = () => {
      toast.error("error");
    }

    return {
      userIdentifier,
      password,
      userIdentifierError,
      passwordError,
      emailError,
      login,
      errorToast
    };
  }
});
</script>

<style scoped>
</style>
