<script setup>
import BHeader from './components/BHeader.vue'
import BFooter from './components/BFooter.vue'
</script>

<template>
  <header>
    <BHeader />
  </header>

  <main class="main-box">
    <router-view></router-view>
  </main>

  <!-- <footer>
    <BFooter />
  </footer> -->

</template>

<style scoped>  
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
</style>