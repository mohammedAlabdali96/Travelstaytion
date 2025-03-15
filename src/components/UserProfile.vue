<template>
  <div class="user-card">
    <img :src="user.avatar" alt="User Avatar" />
    <h3>{{ user.name }}</h3>
    <p>Email: {{ user.email }}</p>
    <p>Location: {{ user.location }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { faker } from "@faker-js/faker";

const user = ref({});

onMounted(() => {
  user.value = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    location: faker.location.city(),
    avatar: faker.image.avatar(),
  };
});
</script>

<style scoped>
.user-card {
  border: 1px solid #ddd;
  padding: 10px;
  width: 200px;
}
</style>
