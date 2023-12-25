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
  <div class="flex flex-column background">
    <div class="text-lg font-semibold mytext">
      {{ props.prediction.name }}
    </div>
    <div class="mytext">
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
