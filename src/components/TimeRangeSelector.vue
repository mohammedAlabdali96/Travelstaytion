<template>
  <div class="flex gap-2 justify-center my-4">
    <button
      v-for="option in options"
      :key="option.value"
      @click="updateSelectedRange(option.value)"
      class="px-4 py-2 border rounded-md"
      :class="{
        'bg-blue-500 text-white': modelValue === option.value,
        'bg-gray-200': modelValue !== option.value,
      }"
    >
      {{ option.label }}
    </button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);

const options = [
  { label: "Last 7 Days", value: "7d" },
  { label: "Last 20 Days", value: "20d" },
  { label: "Last Month", value: "1m" },
];

const updateSelectedRange = (value) => {
  emit("update:modelValue", value); // ✅ Emit event to update the selected range
};
</script>
