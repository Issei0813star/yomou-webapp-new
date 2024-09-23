<template>
  <div class = "login-container">
    <h1>ログイン</h1>
    <form @submit.prevent = "submitForm">
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

export default defineComponent({
  setup() {
    const userName = ref<string>('');
    const password = ref<string>('');
    const email = ref<string>('');
    const userNameError = ref<string>('');
    const passwordError = ref<string>('');
    const emailError = ref<string>('');

    const validateForm = (): boolean => {
      let valid = true;

      if (!userName.value) {
        userNameError.value = 'ユーザー名を入力してください。';
        valid = false;
      }

      if (!password.value) {
        passwordError.value = 'パスワードを入力して下さい。';
        valid = false;
      } else if (password.value.length < 6) {
        passwordError.value = 'パスワードは8文字以上で入力してください。';
        valid = false;
      }

      if(!email.value) {
        emailError.value = 'メールアドレスを入力して下さい。'
        valid = false;
        //TODO メールアドレスの形かどうか
      }

      return valid;
    };

    const clearErrors = (): void => {
      userNameError.value = '';
      passwordError.value = '';
      emailError.value = '';
    };

    const submitForm = (): void => {
      clearErrors();
      if (validateForm()) {
        alert("ログインしました。");

      }
    };

    return {
      userName,
      password,
      email,
      userNameError,
      passwordError,
      emailError,
      submitForm,
    };
  }
});
</script>

<style scoped>
</style>
