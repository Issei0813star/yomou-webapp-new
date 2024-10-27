<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-900">
    <form @submit.prevent="create" class="bg-gray-800 shadow-lg rounded-lg p-8 max-w-md w-full">
      <div class="form-group mb-6">
        <label for="username" class="block text-left mb-2 text-sm font-semibold text-gray-200">ユーザー名</label>
        <input
            type="text"
            id="username"
            v-model="userName"
            :class="['mt-2 block w-full p-3 border rounded-md bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500', { 'border-red-500': userNameError }]"
            placeholder="ユーザー名"
        />
        <span v-if="userNameError" class="text-red-500 text-sm mt-1">{{ userNameError }}</span>
      </div>

      <div class="form-group mb-6">
        <label for="email" class="block text-left mb-2 text-sm font-semibold text-gray-200">メールアドレス</label>
        <input
            type="email"
            id="email"
            v-model="email"
            :class="['mt-2 block w-full p-3 border rounded-md bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500', { 'border-red-500': emailError }]"
            placeholder="メールアドレス"
        />
        <span v-if="emailError" class="text-red-500 text-sm mt-1">{{ emailError }}</span>
      </div>

      <div class="form-group mb-6">
        <label for="password" class="block text-left mb-2 text-sm font-semibold text-gray-200">パスワード</label>
        <input
            type="password"
            id="password"
            v-model="password"
            :class="['mt-2 block w-full p-3 border rounded-md bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500', { 'border-red-500': passwordError }]"
            placeholder="パスワード"
        />
        <span v-if="passwordError" class="text-red-500 text-sm mt-1">{{ passwordError }}</span>
      </div>

      <div class="form-group mb-6">
        <label for="confirmPassword" class="block text-left mb-2 text-sm font-semibold text-gray-200">パスワード確認</label>
        <input
            type="password"
            id="confirmPassword"
            v-model="confirmPassword"
            :class="['mt-2 block w-full p-3 border rounded-md bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500', { 'border-red-500': passwordError }]"
            placeholder="パスワード確認"
        />
        <span v-if="passwordError" class="text-red-500 text-sm mt-1">{{ passwordError }}</span>
      </div>

      <button
          type="submit"
          class="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        アカウント作成
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { UserCreateRequest, createUser } from "@/services/UserService";
import { showError, showSuccess } from "@/utils/toastUtil";

export default defineComponent({
  setup() {
    const userName = ref<string>('');
    const email = ref<string>('');
    const password = ref<string>('');
    const confirmPassword = ref<string>('');

    const userNameError = ref<string>('');
    const passwordError = ref<string>('');
    const emailError = ref<string>('');

    const validateForm = (): boolean => {
      let valid = true;

      if (!userName.value) {
        userNameError.value = 'ユーザー名を入力してください。';
        valid = false;
      }
      if (userName.value.length < 4 || userName.value.length > 30) {
        userNameError.value = 'ユーザー名は4文字以上30文字以内で入力してください。';
        valid = false;
      }

      if (!password.value) {
        passwordError.value = 'パスワードを入力してください。';
        valid = false;
      }
      if (password.value.length < 8 || password.value.length > 20) {
        passwordError.value = 'パスワードは8文字以上20文字以内で入力してください。';
        valid = false;
      }
      if (password.value !== confirmPassword.value) {
        passwordError.value = 'パスワードが一致しません。';
        valid = false;
      }

      if (!email.value) {
        emailError.value = 'メールアドレスを入力してください。';
        valid = false;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.value)) {
        emailError.value = '正しいメールアドレスを入力してください。';
        valid = false;
      }

      return valid;
    };

    const clearErrors = (): void => {
      userNameError.value = '';
      passwordError.value = '';
      emailError.value = '';
    };

    const create = async (): Promise<void> => {
      clearErrors();
      if (validateForm()) {
        try {
          const req: UserCreateRequest = {
            userName: userName.value,
            email: email.value,
            password: password.value
          };

          const res = await createUser(req);
          showSuccess('アカウントの作成に成功しました。');
        } catch (error: any) {
          if (error.response) {
            showError(error.response.data.errorMessage);
          } else {
            showError('アカウントの作成に失敗しました。');
          }
          console.error(error);
        }
      }
    };

    return {
      userName,
      email,
      password,
      confirmPassword,
      userNameError,
      emailError,
      passwordError,
      create
    };
  }
});
</script>

<style scoped>
</style>
