<script setup>
import BHeader from './components/BHeader.vue'
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'
import BFooter from './components/BFooter.vue'

const route = useRoute()
const showHeader = ref(!route.meta.hideHeader)

watch(
  () => route.meta.hideHeader,
  (newValue) => {
    showHeader.value = !newValue
  }
)
</script>


<template>
  <div id="app">
    <header v-if="showHeader">
      <BHeader />
    </header>

    <main class="main-box">
      <transition name="fade-slide" mode="out-in">
        <router-view></router-view>
      </transition>
    </main>
  </div>
</template>

<style scoped>  
@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeOutLeft {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(-100%);
  }
}

.fade-slide-enter-active {
  animation: fadeInLeft 0.5s ease forwards;
}

.fade-slide-leave-active {
  animation: fadeOutLeft 0.5s ease forwards;
}


.main-content {
  padding: 20px;
  position: relative;
}

@media (max-width: 576px) {
  .main-content {
    padding: 10px;
    font-size: 14px;
  }
}

@media (min-width: 577px) and (max-width: 768px) {
  .main-content {
    padding: 15px;
    font-size: 16px;
  }
}

@media (min-width: 769px) {
  .main-content {
    padding: 20px;
    font-size: 18px;
  }
}

.container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 80vw;
  margin: 0 auto;
  padding: 20px;
  background-color: #75be3a;
  border-radius: 10px;
}

#app {
  background: linear-gradient(to bottom right, #75be3a, #f0f0f0);
  min-height: 100vh;
  background-size: cover;
  background-attachment: fixed;
}
</style>