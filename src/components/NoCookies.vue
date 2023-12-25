<script setup lang="ts">
const tg = window.Telegram?.WebApp;
const mainButton = tg.MainButton
mainButton.text="Хорошо, вернусь завтра"
mainButton.show()
mainButton.onClick(tg.close)
</script>

<template>
<div>
  <div class="flex flex-column background mb-2">
    <div class="text-lg mytext text-center">Только одна печенька в день</div>
    <div class="text-lg font-bold mytext text-center">Возвращайся завтра</div>
  </div>
  <img src="../assets/cat.png" class="max-w-screen"/>
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
