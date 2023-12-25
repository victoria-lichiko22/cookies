<script lang="ts" setup>
import {onMounted, ref} from "vue";
import NoCookies from "@/components/NoCookies.vue";
import SelectCookie from "@/components/SelectCookie.vue";

interface CookiePrediction {
  _id: string;
  name: string;
  description: string;
}

const randomCookie = ref<CookiePrediction | undefined>(undefined);
const ok = ref<boolean>(false);
const loaded = ref<boolean>(false);
const tg = window.Telegram?.WebApp;
async function getPredictionAPI()  {
  const response = await fetch("/.netlify/functions/getPrediction",{
    method: 'POST',
    body: tg.initData
  });
  if (!response.ok) {
    ok.value = false;
    throw new Error(`Error fetching data. Status: ${response.status}`);
  }
  const result: CookiePrediction[] = await response.json();
  return result[0];
}

async function getTodayPredictionAPI()  {
  const response = await fetch("/.netlify/functions/getTodayPrediction",{
    method: 'POST',
    headers: {
      'Content-Type': 'text/html'
    },
    body: tg.initData
  } );
  if (!response.ok) {
    throw new Error(`Error fetching data. Status: ${response.status}`);
  }
  return  await response.json();
}


async function getPrediction() {
  randomCookie.value = await getPredictionAPI();
  toggleText()
}

const showText = ref(false);

function toggleText() {
  showText.value =!showText.value;
}

onMounted(async ()=> {
  const count = await getTodayPredictionAPI();
  if (count == 0) {
    ok.value = true;
  }
  loaded.value = true;
})
</script>

<template>
  <div v-if="loaded">
    <div v-if="ok">
      <div v-if="!showText" class="flex flex-wrap justify-content-center">
        <SelectCookie @selected="getPrediction"/>
      </div>
      <div v-if="showText" class="flex flex-column background">
        <div class="text-lg font-semibold mytext">
          {{ randomCookie.name }}
        </div>
        <div class="mytext">
          {{ randomCookie.description }}
        </div>
      </div>
    </div>
    <div v-else>
      <NoCookies/>
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
