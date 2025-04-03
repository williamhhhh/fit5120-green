<template>
    <div class="header">
      <div class="title-section">
        <h1 class="title">Sun Aware</h1>
      </div>
    </div>
  <!-- -------------------------------------------- -->
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
    border-bottom: 1px solid #ddd;
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
  
  </style>
  