<template>
    <div v-if="errorStore.globalError" class="error-overlay">
      <div class="error-box">
        <h2>Error</h2>
        <p>{{ errorStore.globalError }}</p>
        <button @click="errorStore.clearError">Dismiss</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useErrorStore } from "@/store/errorStore";
  
  const errorStore = useErrorStore();
  </script>
  
  <style scoped>
  .error-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .error-box {
    background: white;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  }
  
  button {
    background: #ff5c5c;
    color: white;
    border: none;
    padding: 10px 20px;
    margin-top: 10px;
    border-radius: 4px;
    cursor: pointer;
  }
  </style>
  