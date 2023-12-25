<script setup lang="ts">
interface CookiePrediction {
  _id: string;
  name: string;
  description: string;
}

defineProps<{ prediction: CookiePrediction}>()

const tg = window.Telegram?.WebApp;
const mainButton = tg.MainButton
mainButton.text="Закрыть"
mainButton.show()
mainButton.onClick(tg.close)
</script>

<template>
  <div class="flex flex-column background">
    <div class="text-lg font-semibold mytext">
      {{ prediction.name }}
    </div>
    <div class="mytext">
      {{ prediction.description }}
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
