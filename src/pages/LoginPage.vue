<template>
  <div class = "login-container">
    <h1>ログイン</h1>
    <form @submit.prevent = "login">
      <div class = "form-group">
        <label for = "userName">ユーザー名</label>
        <input
            type = "text"
            id = "userName"
            v-model="userName"
            :class = "{ 'is-invalid': userNameError }"
        />
        <span v-if = "userNameError" class = "error-message">{{ userNameError }}</span>
      </div>

      <div >
        <label for = "email">メールアドレス</label>
        <input
            type = "text"
            id = "email"
            v-model = "email"
            :class = "{ 'is-invalid' : emailError}"
        />
        <span v-if="emailError" class="error-message">{{ emailError }}</span>
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
import LoginService from "@/sevices/LoginService";

export default defineComponent({
  setup() {
    const userName = ref<string>('');
    const password = ref<string>('');
    const email = ref<string>('');
    const userNameError = ref<string>('');
    const passwordError = ref<string>('');
    const emailError = ref<string>('');

    const validateForm = (): boolean => {
      debugger
      let valid = true;
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


      if (!userName.value) {
        userNameError.value = 'ユーザー名を入力してください。';
        valid = false;
      }
      else if (userName.value.length < 4 || userName.value.length > 30) {
        userNameError.value = 'ユーザー名は4文字以上30文字以内で入力して下さい。'
      }

      if (!password.value) {
        passwordError.value = 'パスワードを入力して下さい。';
        valid = false;
      } else if (password.value.length < 8 || password.value.length > 20) {
        passwordError.value = 'パスワードは8文字以上20文字以内で入力してください。';
        valid = false;
      }

      if(!email.value) {
        emailError.value = 'メールアドレスを入力して下さい。'
        valid = false;
        //TODO メールアドレスの形かどうか
      }
      else if (!emailPattern.test(email.value)) {
        emailError.value = '正しいメールアドレスを入力してください。'
        valid = false;
      }
      return valid;
    };

    const clearErrors = (): void => {
      userNameError.value = '';
      passwordError.value = '';
      emailError.value = '';
    };

    const login = (): void => {
      clearErrors();
      if (validateForm()) {
        try {
          LoginService.login({userIdentifier: userName.value, password: password.value})
        }
        catch (error) {
          //TODO エラーハンドリング
          console.error(error);
        }
      }
    };

    return {
      userName,
      password,
      email,
      userNameError,
      passwordError,
      emailError,
      login,
    };
  }
});
</script>

<style scoped>
</style>
