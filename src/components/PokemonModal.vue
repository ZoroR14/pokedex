<script setup lang="ts">

import { defineProps, defineEmits } from 'vue';

defineProps<{ isVisible: boolean }>();
const emit = defineEmits<{
  (e: 'close'): void;
}>();

function closeModal() {
  emit('close');
}
</script>
<template>
    <div v-if="isVisible" class="modal-overlay" @click="closeModal">
        <div class="modal-content" @click.stop>
           <slot></slot>
        </div>
  </div>
</template>
<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
}
</style>