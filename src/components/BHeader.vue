<template>
  <transition name="nav-animation" mode="out-in">
    <div class="container-header" v-if="isNavVisible">
      <div class="container-fluid">
        <div class="row align-items-center justify-content-between">

          <!-- Left Section: Logo + Nav -->
          <div class="col-8 col-md-10 d-flex align-items-center header-left" style="position:relative;">
            <img src="@/assets/images/logonv.png" alt="Logo" class="logo-absolute" />
            <!-- <img src="../assets/logo.png" alt="Logo" class="logo" /> -->
            <!-- Desktop Nav -->
            <ul class="d-none d-md-flex flex-row list-unstyled mb-0">
              <li class="nav-item">
                <router-link to="/home" class="nav-link" active-class="active">Home</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/GreenMap" class="nav-link" active-class="active">Discover Green Space</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/Chat" class="nav-link" active-class="active">Make your own Green Space</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/GreenCalculator" class="nav-link" active-class="active">Know Your Carbon Footprint</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/StoryTelling" class="nav-link" active-class="active">Daniel's Life</router-link>
              </li>
            </ul>
          </div>

          <!-- Right Section: Button + Hamburger -->
          <div class="col-4 col-md-2 d-flex justify-content-end align-items-center">
            <div class="header-right me-2 d-none d-md-flex">
              <div class="button-text">Start!</div>
            </div>

            <!-- Mobile Toggler -->
            <button
              class="navbar-toggler custom-toggler d-md-none"
              type="button"
              @click="isMenuOpen = !isMenuOpen"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile Menu Dropdown -->
      <div v-if="isMenuOpen" class="dropdown-menu-mobile d-md-none">
        <router-link to="/home" class="nav-link" active-class="active">Home</router-link>
        <router-link to="/reminder" class="nav-link" active-class="active">Reminder</router-link>
        <router-link to="/GreenAdvice" class="nav-link" active-class="active">Advice</router-link>
        <router-link to="/GreenMap" class="nav-link" active-class="active">Map</router-link>
        <router-link to="/Chat" class="nav-link" active-class="active">Chat</router-link>
        <router-link to="/GreenCalculator" class="nav-link" active-class="active">Calculator</router-link>
      </div>

      <div class="line-container">
        <div class="line">
        </div>
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
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 15px 59px;
    padding-bottom: 3px;
    gap: 10px;
    width: 100%;

    position: relative;
    background: none;
    backdrop-filter: blur(17px);
    /* Note: backdrop-filter has minimal browser support */
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

    position: relative;
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
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: px;
    gap: 30%;
    width: 100%;
  }

  .header-left {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;
    gap: 5px;
    margin: 0 auto;
  }

  .header-right {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 10px 35px;
    gap: 10px;

    margin: 0 auto;
    width: 133px;
    height: 44px;

    background: #7abd4c;
    /* background: none; */
    /* Front Shadow */
    box-shadow: 0px 2px 30px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
  }

  .button-text {
    width: 120px;
    height: 24px;

    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    /* identical to box height, or 150% */
    text-align: center;
    font-feature-settings: 'salt' on, 'liga' off;

    color: #FFFFFF;

  }

ul.d-md-flex {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  min-width: 0;
  margin-left: 150px;
  margin-right: 0;
  padding: 0;
}

.nav-item {
  flex: 1 1 0; 
  text-align: center;
}

  .nav-link {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      padding: 14px 22px;
      gap: 12px;
      font-family: 'DM Serif Display', serif;
      font-style: normal;
      font-weight: 600;
      font-size: 20px;
      line-height: 21px;

      margin: 0 auto;
      height: 40px;

      /* background: #90CF8E; */
      border-radius: 48px;
  }

.nav-link:hover {
  color: #7abd4c;
  transform: scale(1.03);
}

/* Active state */
.nav-link.active {
  font-weight: 600;
  color: #7abd4c;
  transform: scale(1.03);
}
  
  .title-text{
    /* font-family: 'Poppins';
    font-style: normal; */
    font-family: 'Domaine Display Narrow';
    font-style: italic;
    font-weight: 700;
    font-size: 40px;
    line-height: 34px;
    /* identical to box height, or 85% */

    color: #7abd4c;
    /* border: 2px solid #90CF8E; */
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

.line-container{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
}

.line{
    border: 0.5px solid #B8B8B8;
    transform: rotate(0.16deg);
    width:100%;
    justify-content: space-between;
}

.logo {
  height: 700px;
  width: auto;
  margin-right: 32px;
  flex-shrink: 0;
  position: relative;
  top: 5px;
}
.logo-absolute {
  position: absolute;
  left: -63px;
  top: -78px;
  height: 200px;
  width: auto;
  z-index: 1000;
  pointer-events: none;
}

</style>