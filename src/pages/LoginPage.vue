<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-blue-50">
    <form @submit.prevent="login" class="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
      <div class="form-group mb-6">
        <label for="userIdentifier" class="block text-left mb-2 text-sm font-semibold text-gray-700">ユーザー名またはメールアドレス</label>
        <input
            type="text"
            id="userIdentifier"
            v-model="userIdentifier"
            :class="['mt-2 block w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500', { 'border-red-500': userIdentifierError }]"
            placeholder="ユーザー名またはメールアドレス"
        />
        <span v-if="userIdentifierError" class="text-red-500 text-sm mt-1">{{ userIdentifierError }}</span>
      </div>

      <div class="form-group mb-6">
        <label for="password" class="block text-left mb-2 text-sm font-semibold text-gray-700">パスワード</label>
        <input
            type="password"
            id="password"
            v-model="password"
            :class="['mt-2 block w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500', { 'border-red-500': passwordError }]"
            placeholder="パスワード"
        />
        <span v-if="passwordError" class="text-red-500 text-sm mt-1">{{ passwordError }}</span>
        <div @click="goToResetPassword" class="text-blue-600 text-right text-xs mt-1">パスワードを忘れた場合</div>
      </div>

      <button
          type="submit"
          class="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        ログイン
      </button>
    </form>

    <div class="w-full max-w-md mt-4">
      <button
          @click=goToCreateUser
          type="button"
          class="w-[calc(100%*2/3)] bg-white text-blue-600 font-semibold my-5 py-2 border border-blue-600 rounded-md hover:bg-blue-100 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        新しいアカウントを作成
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import UserService , { LoginRequest, LoginResponse } from "@/sevices/UserService";
import router from '@/router';
import { showError, showSuccess } from '@/utils/toastUtil'

export default defineComponent({
  setup() {
    const userIdentifier = ref<string>('');
    const password = ref<string>('');
    const userIdentifierError = ref<string>('');
    const passwordError = ref<string>('');

    const validateForm = (): boolean => {
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
    };

    const login = async (): Promise<void> => {
      clearErrors();
      if (validateForm()) {
        try {
          const req: LoginRequest = {
            userIdentifier: userIdentifier.value,
            password: password.value
          }
          const res: LoginResponse = await UserService.login(req);

          localStorage.setItem('userId', res.userId.toString());
          localStorage.setItem('token', res.token);

          showSuccess('ログインしました。');
          await router.push('/');
        } catch (error: any) {
          if (error.response) {
            showError(error.response.data.errorMessage);
          } else {
            showError('ログインに失敗しました。');
          }
          console.error(error);
        }
      }
    };

    const goToCreateUser = () => {
      router.push('/user/create')
    }

    const goToResetPassword = () => {
      router.push('/user/password/reset')
    }

    return {
      userIdentifier,
      password,
      userIdentifierError,
      passwordError,
      login,
      showError,
      showSuccess,
      goToCreateUser,
      goToResetPassword
    };
  }
});
</script>

<style scoped>
</style>
