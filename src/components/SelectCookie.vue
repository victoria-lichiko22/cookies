<script setup lang="ts">
import {ref} from "vue";

const emit = defineEmits(['selected'])

function getCookie(id: number) {
  cookieSelected.value[id] = true
  setTimeout(() => {
    cookieSelected.value[id] = false
  }, 1500)
  emit('selected', id)
}

const cookieSelected  = ref([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
])
</script>

<template>
<div>
  <div class="flex flex-column background mb-2 mt-2">
    <div class="text-lg mytext text-center">Выбери печеньку на свой вкус</div>
  </div>
  <div class="flex flex-wrap justify-content-center cursor-pointer">
    <img v-for="(v,n) in cookieSelected"
         alt="Cookie" src="../assets/cookie.png"
         width="100" height="100"
         :class="{ shake: v }"
         @click="getCookie(n)"/>
  </div>
</div>
</template>

<style scoped>
.background {
  background-color: var(--tg-theme-bg-color);
}

.mytext {
  color: var(--tg-theme-text-color);
}

.shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>
