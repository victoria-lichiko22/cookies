<script lang="ts" setup>
import {ref} from "vue";

interface CookiePrediction {
  _id: string;
  name: string;
  description: string;
}

const randomCookie = ref<CookiePrediction | undefined>(undefined);

async function getPredictionAPI()  {
  const result : CookiePrediction[] = await fetch("/.netlify/functions/getPrediction").then(response => response.json());
  return result[0];
}

async function getPrediction() {
  randomCookie.value = await getPredictionAPI();
  console.log(randomCookie.value);
  toggleText()
}

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
           @click="getPrediction()"
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
