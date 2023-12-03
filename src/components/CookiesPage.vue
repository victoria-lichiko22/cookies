<script lang="ts" setup>
import {onMounted, ref} from "vue";

interface CookiePrediction {
  _id: string;
  name: string;
  description: string;
}

const randomCookie = ref<CookiePrediction | undefined>(undefined);
const ok = ref<boolean>(true);
const tg = window.Telegram?.WebApp;
async function getPredictionAPI()  {
  const response = await fetch("/.netlify/functions/getPrediction?user="+tg?.initDataUnsafe?.user?.username);
  if (!response.ok) {
    ok.value = false;
    throw new Error(`Error fetching data. Status: ${response.status}`);
  }
  const result: CookiePrediction[] = await response.json();
  return result[0];
}

async function getPrediction() {
  toggleText()
}

const showText = ref(false);

function toggleText() {
  showText.value =!showText.value;
}

onMounted(async ()=> {
  randomCookie.value = await getPredictionAPI();
  console.log(randomCookie.value);
})
</script>

<template>
  <div>
    <div v-if="ok">
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
    <div v-else>
      <div class="text-lg font-semibold mytext">Приходи завтра</div>
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
