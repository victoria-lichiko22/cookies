<script lang="ts" setup>
import {ref} from "vue";

interface CookiePrediction {
  name: string;
  description: string;
}

async function getPrediction() : Promise<CookiePrediction> {
  const result : CookiePrediction[] = await fetch("/.netlify/functions/getPrediction").then(response => response.json());
  return result[0];
}

const randomCookie = await getPrediction();

const tg = window.Telegram?.WebApp;

const showText = ref(false);

function toggleText() {
  showText.value =!showText.value;
}
</script>

<template>
  <div>
    <div v-if="!showText" class="flex flex-wrap justify-content-center">
      <img v-for="n in 9" alt="Vue logo" class="logo"
           src="../assets/cookie.png" width="100" height="100"
           @click="toggleText()"
      />
    </div>
    <div v-if="showText" class="flex flex-column background">
      <div class="text-lg font-semibold mytext">
        {{ randomCookie.name }}
      </div>
      <div class="mytext">
        {{ randomCookie.description }}
      </div>
      {{ tg }}
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
