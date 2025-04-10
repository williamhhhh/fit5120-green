<template>
  <!-- -------------------------------------------- -->
   <div class="container-header">

        <div><Text class="text">cool the city</Text></div>

        <div class="hamburger" @click= "isMenuOpen = !isMenuOpen">
            <span>&#9776;</span>
        </div>

        <header class="d-none d-md-flex justify-content-center py-3" style="gap: 5px;">
        <!-- <ul class="nav nav-pills"> -->
            <li class="nav-item">
            <router-link to="/" class="nav-link" active-class="active" aria-current="page">Home</router-link>
            </li>
            <li class="nav-item" active>
            <router-link to="/reminder" class="nav-link" active-class="active">Reminder</router-link>
            </li>
            <li class="nav-item">
            <router-link to="/GreenAdvice" class="nav-link" active-class="active">Advice</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/GreenMap" class="nav-link" active-class="active">Map</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/Chat" class="nav-link" active-class="active">Chat</router-link>
            </li>
        <!-- </ul> -->
        </header>
        
        <div v-if="isMenuOpen" class="dropdown-menu-mobile">
            <router-link to="/" class="nav-link" active-class="active" aria-current="page">Home</router-link>
            <router-link to="/reminder" class="nav-link" active-class="active">Reminder</router-link>
        </div>
        <!-- <div class="col-md-2">
            <div><button class="button-get-started">get started</button></div>
        </div> -->
    </div>
</template>

<script setup>
import { ref } from 'vue';

const isMenuOpen = ref(false);

// const navItems = document.querySelectorAll('.nav-item');

// navItems.forEach(item => {
//   item.addEventListener('click', () => {
//     navItems.forEach(i => i.classList.remove('active')); // Remove from all
//     item.classList.add('active'); // Add to clicked
//   });
// });


</script>  

<style scoped>

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

  .hamburger {
  width: 30px;
  height: 70px;
  font-size: 40px;
  /* background-color: #333; */
  border-radius: 2px;
  transition: all 0.3s ease;
  position: relative;
  cursor: pointer;
}

/* Add pseudo-lines for the hamburger bars */
.hamburger::before,
.hamburger::after {
  content: "";
  position: absolute;
  width: 30px;
  height: 3px;
  background-color: #333;
  border-radius: 2px;
  transition: all 0.3s ease;
}

.hamburger::before {
  top: -10px;
}

.hamburger::after {
  top: 10px;
}

/* Hover effect */
.hamburger:hover {
  transform: scale(1.1);
  background-color: #75BE3A;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

/* Active effect (like a click animation) */
.hamburger:active {
  transform: scale(0.95);
  background-color: #5a9e2b;
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

  @media (max-width: 767px) {
    .hamburger {
      display: block;
    }
  }

  @media (min-width: 768px) {
    .dropdown-menu-mobile {
      display: none;
    }

    .hamburger {
      display: none;
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


/* .nav-item:hover {
  background: #75BE3A;
  color: #fff;
  transform: scale(1.03);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.nav-item.active {
  background: #75BE3A;
  color: #ffffff;
  font-weight: 600;
  box-shadow: inset 0 0 0 2px #5a9e2b;
} */

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

</style>
  