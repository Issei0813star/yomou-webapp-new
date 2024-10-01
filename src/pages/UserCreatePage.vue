<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-blue-50">
    <form @submit.prevent="createUser" class="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
      <div class="form-group mb-6">
        <label for="username" class="block text-left mb-2 text-sm font-semibold text-gray-700">ユーザー名</label>
        <input
            type="text"
            id="username"
            v-model="username"
            :class="['mt-2 block w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500', { 'border-red-500': usernameError }]"
            placeholder="ユーザー名"
        />
        <span v-if="usernameError" class="text-red-500 text-sm mt-1">{{ usernameError }}</span>
      </div>

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

