<template>
  <!-- -------------------------------------------- -->
   <div class="row">
        <div class="col-md-2">
            <div><Text class="text">cool the city</Text></div>
        </div>
        <div class="col-md-8">
            <header class="d-flex justify-content-center py-3">
            <ul class="nav nav-pills">
                <li class="nav-item">
                <router-link to="/" class="nav-link" active-class="active" aria-current="page">Home</router-link>
                </li>
                <li class="nav-item">
                <router-link to="/reminder" class="nav-link" active-class="active">Reminder</router-link>
                </li>
                <li class="nav-item">
                <router-link to="/impact" class="nav-link" active-class="active">UV impact</router-link>
                </li>
                <li class="nav-item">
                <router-link to="/clothing" class="nav-link" active-class="active">Clothing Recommendation</router-link>
                </li>
                <li class="nav-item">
                <router-link to="/personalisation" class="nav-link" active-class="active">Personalisation</router-link>
                </li>
            </ul>
            </header>
        </div>
        <div class="col-md-2">
            <div><button class="button-get-started">get started</button></div>
        </div>
    </div>
  </template>
  
  <style scoped>
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
  
  .nav-pills{
    /* border-bottom: 1px solid #ddd; */
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
    padding-top: 35px;
    font-family: 'Domaine Display Narrow';
    font-style: italic;
    font-weight: 600;
    font-size: 22px;
    line-height: 26px;
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
  