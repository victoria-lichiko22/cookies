<script setup lang="ts">
interface CookiePrediction {
  _id: string;
  name: string;
  description: string;
}

const props = defineProps<{ prediction: CookiePrediction}>()

const tg = window.Telegram?.WebApp;
const mainButton = tg.MainButton
mainButton.text="Закрыть"
mainButton.show()
mainButton.onClick(tg.close)
</script>

<template>
  <div class="flex flex-column background mx-2 my-5">
    <div class="text-lg font-semibold mytext text-center mb-2">
      {{ props.prediction.name }}
    </div>
    <div class="mytext text-center">
      {{ props.prediction.description }}
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
</style>
