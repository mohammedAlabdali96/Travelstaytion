<template>
  <GlobalError />
  <Navbar />
  <router-view />
</template>

<script setup>
import Navbar from "@/components/Navbar.vue";
import GlobalError from "@/components/GlobalError.vue";
</script>
