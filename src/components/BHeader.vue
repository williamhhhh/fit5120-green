<template>
  <!-- -------------------------------------------- -->
   <div class="container-header">

        <div><Text class="text">cool the city</Text></div>

        <div class="hamburger" @click= "isMenuOpen = !isMenuOpen">
            <span>&#9776;</span>
        </div>

        <header class="d-none d-md-flex justify-content-center py-3">
        <!-- <ul class="nav nav-pills"> -->
            <li class="nav-item">
            <router-link to="/" class="nav-link" active-class="active" aria-current="page">Home</router-link>
            </li>
            <li class="nav-item">
            <router-link to="/reminder" class="nav-link" active-class="active">Reminder</router-link>
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

</script>  

<style scoped>

  @media (min-width: 768px){
  .container-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px 10px 10px 30px;
    gap: 100px;

    position: absolute;
    width: 676px;
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
    display: none;
    font-size: 2rem;
    cursor: pointer;
  }

  .dropdown-menu-mobile {
    position: absolute;
    top: 80px;
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
    .dropdown-menu-mobile {
      display: none;
    }
  }
  
  .hamburger:hover {
    background-color: #E4FDE2;
  }

  .hamburger:active {
    background-color: #E4FDE2;
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
    width: 135px;
    height: 52px;

    background: #90CF8E;
    border-radius: 48px;

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
  