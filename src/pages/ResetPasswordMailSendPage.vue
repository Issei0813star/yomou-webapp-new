<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-blue-50">
    <form @submit.prevent="resetPassword" class="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
      <h2 class="text-2xl font-semibold mb-6 text-center text-gray-700">パスワード再設定</h2>
      <p class="mb-6 text-sm text-gray-600 text-center">
        登録されているメールアドレスを入力してください。<br />
        パスワード再設定用のリンクを送信します。
      </p>

      <div class="form-group mb-6">
        <label for="email" class="block text-left mb-2 text-sm font-semibold text-gray-700">メールアドレス</label>
        <input
            type="email"
            id="email"
            v-model="email"
            :class="['mt-2 block w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500', { 'border-red-500': emailError }]"
            placeholder="メールアドレス"
        />
        <span v-if="emailError" class="text-red-500 text-sm mt-1">{{ emailError }}</span>
      </div>

      <button
          type="submit"
          class="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        メールを送信
      </button>

      <div v-if="message" class="text-green-600 text-center mt-6">
        {{ message }}
      </div>

      <div class="login-link text-center mt-6">
        <p>アカウントをお持ちですか？ <router-link to="/login" class="text-blue-500">ログイン</router-link></p>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import UserService from '@/services/UserService';
import { showError, showSuccess } from '@/utils/toastUtil';

export default defineComponent({
  setup() {
    const email = ref<string>('');
    const emailError = ref<string>('');
    const message = ref<string>('');

    const validateForm = (): boolean => {
      let valid = true;
      emailError.value = '';

      if (!email.value) {
        emailError.value = 'メールアドレスを入力してください。';
        valid = false;
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
          emailError.value = '正しいメールアドレスを入力してください。';
          valid = false;
        }
      }

      return valid;
    };

    const resetPassword = async (): Promise<void> => {
      if (validateForm()) {
        try {
          // TODO メール送信
          // await UserService.sendResetLink(email.value);
          showSuccess('パスワード再設定用のメールを送信しました。');
          message.value = 'パスワード再設定用のメールが送信されました。メールを確認してください。';
        } catch (error: any) {
          if (error.response) {
            showError(error.response.data.errorMessage);
          } else {
            showError('リセットリンクの送信に失敗しました。');
          }
        }
      }
    };

    return {
      email,
      emailError,
      message,
      resetPassword
    };
  }
});
</script>

<style scoped>
.login-link {
  margin-top: 1.5rem;
}
</style>
