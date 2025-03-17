<template>
    <nav class="bg-gray-900 text-white p-4 flex justify-between items-center">
      <div class="flex items-center space-x-4">
        <img
          :src="fakeUser.user.avatar"
          alt="User Avatar"
          class="w-10 h-10 rounded-full"
        />
        <div>
          <p class="font-semibold">{{ fakeUser.user.name }}</p>
          <p class="text-sm text-gray-400">{{ fakeUser.user.jobTitle }}</p>
        </div>
      </div>
      <button
        @click="fakeUser.refreshUser"
        class="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
      >
        Refresh Profile
      </button>
    </nav>
  </template>
  
  <script setup>
  import { useFakeUserStore } from "@/store/fakeUserStore";
  
  const fakeUser = useFakeUserStore();
  </script>
  