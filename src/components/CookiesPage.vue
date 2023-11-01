<script lang="ts" setup>
import type {Ref} from "vue";
import {computed, ref} from "vue";

interface CookiePrediction {
  name: string;
  description: string;
}

const cookieList: Ref<CookiePrediction[]> = ref([
  {
    name: "Самоуважение",
    description: "У тебя достаточно сил отпустить те отношения, убеждения или поведение, которые не служат твоему высшему благу."
  },
  {name: "Эмоции", description: "Наши эмоции – это неизменный показатель состояния единения со своим истинным «Я»."}
])

function getRandomID() {
  return Math.floor(Math.random() * cookieList.value.length)
}

const randomCookie = computed(()=> cookieList.value[getRandomID()])
</script>

<template>
  <div class="flex flex-column">
    <div class="text-lg font-semibold">
      {{ randomCookie.name }}
    </div>
    <div>
      {{ randomCookie.description }}
    </div>
  </div>
</template>

<style scoped>

</style>
