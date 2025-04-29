<template>
  <transition
    name="nav-animation"
    mode="out-in"
  >
    <div class="container-header" v-if="isNavVisible">
      <div>
        <div class="text">cool the city</div>
      </div>

      <header class="d-none d-md-flex justify-content-center py-3" style="gap: 5px;">
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active" aria-current="page">Home</router-link>
        </li>
        <!-- <li class="nav-item">
          <router-link to="/reminder" class="nav-link" active-class="active">Reminder</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/GreenAdvice" class="nav-link" active-class="active">Advice</router-link>
        </li> -->
        <li class="nav-item">
          <router-link to="/GreenMap" class="nav-link" active-class="active">Map</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/Chat" class="nav-link" active-class="active">Chat</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/GreenCalculator" class="nav-link" active-class="active">Calculator</router-link>
        </li>
      </header>

      <!-- <div v-if="isMenuOpen" class="dropdown-menu-mobile">
        <router-link to="/" class="nav-link" active-class="active" aria-current="page">Home</router-link>
        <router-link to="/reminder" class="nav-link" active-class="active">Reminder</router-link>
      </div> -->

    <!-- Correct toggler button -->
      <button
        class="navbar-toggler custom-toggler"
        type="button"
        @click="isMenuOpen = !isMenuOpen"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div v-if="isMenuOpen" class="dropdown-menu-mobile">
        <router-link to="/" class="nav-link" active-class="active" aria-current="page">Home</router-link>
        <router-link to="/reminder" class="nav-link" active-class="active">Reminder</router-link>
        <router-link to="/GreenAdvice" class="nav-link" active-class="active">Advice</router-link>
        <router-link to="/GreenMap" class="nav-link" active-class="active">Map</router-link>
        <router-link to="/Chat" class="nav-link" active-class="active">Chat</router-link>
        <router-link to="/GreenCalculator" class="nav-link" active-class="active">Calculator</router-link>
      </div>

    </div>
  </transition>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

const isMenuOpen = ref(false);
const isNavVisible = ref(true);

const route = useRoute();


watch(
  () => route.path,
  () => {
    isNavVisible.value = false;
    setTimeout(() => {
      isNavVisible.value = true;
    }, 500);
  }
);
</script>

<style scoped>
@keyframes bounce-in {
  0% {
    transform: scale(0.3);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
@keyframes slide-out-elliptic-top-bck {
  0% {
    transform: translateY(0) rotateX(0);
    opacity: 1;
  }
  100% {
    transform: translateY(-600px) rotateX(30deg);
    opacity: 0;
  }
}
.nav-animation-enter-active {
  animation: bounce-in 0.5s ease both;
}
.nav-animation-leave-active {
  animation: slide-out-elliptic-top-bck 0.5s ease both;
}


  @media (min-width: 768px){
  .container-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px 10px 10px 30px;
    gap: 80px;

    position: absolute;
    width: 760px;
    height: 72px;
    left: calc(50% - 676px/2);
    top: 24px;

    background: #E4FDE2;
    backdrop-filter: blur(17px);
    /* Note: backdrop-filter has minimal browser support */
    border-radius: 70px;
    z-index: 100;
  }
  }

  @media (max-width: 767px){
  .container-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px 10px 10px 30px;
    gap: 100px;

    position: absolute;
    width: 80%;
    height: 35px;
    left: 10%;
    right: 10%;
    top: 15px;

    background: #E4FDE2;
    backdrop-filter: blur(17px);
    /* Note: backdrop-filter has minimal browser support */
    border-radius: 70px;
    z-index: 100;
  }
  }

  .header {
    background-color: #c3e6f2;
    padding: 30px 0;
    border-bottom: 2px solid #ddd;
  }
  
  .title-section {
    text-align: center;
    margin-bottom: 10px;
  }
  
  .title {
    font-size: 25px;
    font-weight: bold;
    color: rgb(8, 8, 109);
    margin: 0;
  }


  .nav-item{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 14px 22px;
    gap: 12px;

    margin: 0 auto;
    width: 100px;
    height: 40px;

    /* background: #90CF8E; */
    border-radius: 48px;

  }

.nav-link {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 14px 22px;
    gap: 12px;

    margin: 0 auto;
    width: 100px;
    height: 40px;

    /* background: #90CF8E; */
    border-radius: 48px;
}

.nav-link:hover {
  background: #75BE3A;
  color: #fff;
  transform: scale(1.03);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Active state */
.nav-link.active {
  background: #75BE3A;
  color: #ffffff;
  font-weight: 600;
  box-shadow: inset 0 0 0 2px #5a9e2b;
}
  
  .nav-pills .nav-link{
    color: #9b9696;
    font-size: 16px;
    padding: 10px 15px;
    border-radius: 0px;
  }
  
  .nav-pills .nav-link.active {
    background-color: white;
    color: black;
    border-bottom: 1px solid black;
  }

  .text{
    margin: 0 auto;
    width: 121px;
    height: 26px;

    font-family: 'Domaine Display Narrow';
    font-style: italic;
    font-weight: 600;
    font-size: 22px;
    line-height: 26px;
    /* identical to box height, or 118% */
    display: flex;
    align-items: center;

    color: #000000;
  }

  .button-get-started{
    margin-top: 15px;
    width: 120px;
    height: 40px;
    background: #75BE3A;
    border-radius: 5px;
    border: none;
    color: white;
    font-family: 'DM Sans';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .button-get-started:hover{
    background: #5a9e2b;
  }

  .button-get-started:active{
    background: #4a8b23;
}

/* Hamburger Button */
.custom-toggler {
  border: none;
  background: none;
  padding: 10px;
  cursor: pointer;
}

@media screen and (min-width: 768px) {
  .custom-toggler {
    display: none;
  }
  
}

/* Hamburger Icon Lines */
.navbar-toggler-icon {
  display: block;
  width: 28px;
  height: 3px;
  background-color: #333; /* black bar */
  border-radius: 2px;
  position: relative;
  transition: all 0.3s ease-in-out;
}

/* Top and Bottom bars */
.navbar-toggler-icon::before,
.navbar-toggler-icon::after {
  content: "";
  position: absolute;
  left: 0;
  width: 28px;
  height: 3px;
  background-color: #333;
  border-radius: 2px;
  transition: all 0.3s ease-in-out;
}

/* Position top bar */
.navbar-toggler-icon::before {
  top: -8px;
}

/* Position bottom bar */
.navbar-toggler-icon::after {
  top: 8px;
}

/* Hover effect */
.custom-toggler:hover .navbar-toggler-icon,
.custom-toggler:hover .navbar-toggler-icon::before,
.custom-toggler:hover .navbar-toggler-icon::after {
  background-color: #75BE3A; /* light green on hover */
}

.dropdown-menu-mobile {
    position: absolute;
    top: 35px;
    left: 0;
    right: 0;
    background-color: #e4fde2;
    border-radius: 10px;
    padding: 10px 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

@media screen and (min-width: 768px) {
  .dropdown-menu-mobile {
    display: none; /* Hide on larger screens */
  }
  
  
}


</style>
  