<script setup lang="ts">
const emit = defineEmits(['selected'])

function getCookie(id: number) {
  emit('selected', id)
}
</script>

<template>
<div>
  <div class="flex flex-column background mb-2 mt-2">
    <div class="text-lg mytext text-center">Выбери печеньку на свой вкус</div>
  </div>
  <img v-for="n in 9" alt="Cookie" src="../assets/cookie.png" width="100" height="100"
       @click="getCookie(n)"/>
</div>
</template>

<style scoped>
.background {
  background-color: var(--tg-theme-bg-color);
}

.mytext {
  color: var(--tg-theme-text-color);
}
</style>
