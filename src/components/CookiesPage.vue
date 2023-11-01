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
  {name: "Эмоции", description: "Наши эмоции – это неизменный показатель состояния единения со своим истинным «Я»."},
  { name: "Принцип подобия", description: "Нет случайных людей в нашей жизни. Нас привлекают те люди, у которых те же нерешенные проблемы. Они настроены на нашу частоту и похожи на нас, хотя внешне кажется другими."},
  { name: "Самопринятие", description: "Мандала воспламеняет оптимизм и уверенность в себе. Честное приятие себя. Там, где свет, обязательно есть тень."},
  { name: "Соавторство", description: "Мир не нуждается в исправлениях. Творите свою собственную жизнь, позволяя другим людям творить свою."},
  { name: "Ресурсность", description: "Все уже работает для тебя. Ресурсы уже собраны. Осталось только попасть в Вихрь."},
  { name: "Внутренний голос", description: "Важно учиться доверять своему внутреннему голосу, чтобы подниматься над страхом отторжения, неправильного понимания или необходимости внешнего подтверждения" +
        "Аффирмация: Я всегда настроена слышать и понимать свой внутренний голос!"},
  { name: "Умиротворение", description: "Без истинного мира внутри, мы хотим все подчинить и контролировать, ошибочно думая, что контроль даст нам чувство порядка и безопасности."},
  { name: "Закон притяжения", description: " Ничего не появляется в нашей жизни просто так. Закон Притяжения реагирует на мысли, которые предлагаете вы."},
  { name: "Творчество", description: "Освободи место для своей творческой стороны, чтобы впустить веселье, радость и спонтанность."}
])

function getRandomID() {
  return Math.floor(Math.random() * cookieList.value.length)
}

const randomCookie = computed(()=> cookieList.value[getRandomID()])

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
           src="../assets/cookie.PNG" width="100" height="100"
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
