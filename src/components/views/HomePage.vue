<template> 
    <div class="desc-container">
        <img src="https://i.imgur.com/jYx4z1b.jpeg" alt="green" class="green-city">
        <div class="title-container">
            <h1 class="title">Melbourne is Getting Hotter - Let's Cool It Down Together</h1>
            <p class="description">
                Join us in tackling urban heat and reducing CO2 emissions through small, everyday actions.
            </p>
            <button @click="navigateTo('/GreenMap')" class="button-get-started">Get Started</button>
        </div>
    </div>
</template>

<script>
export default {
  methods: {
    navigateTo(link) {
      window.location.href = link;
    }
  }
};
</script>

<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100vh;
  background-color: #ffffff00;
}

.desc-container {
  position: relative;
  width: 100%;
  min-height: 100vh;
  margin: auto;
  align-items: center;
  background: none;
}

.green-city {
  width: 100%;
  position: absolute;
  height: 100%;
  background-size: contain;
  transform: scaleX(-1);
  filter: brightness(50%);
}

@media (min-width: 1281px) {
  .green-city {
    height: auto;
  }
}

@media (min-width: 769px) {
  .title-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: absolute;
    width: 724px;
    height: 272px;
    left: 70px;
    top: 200px;
    color: white;
    z-index: 100;
  }
}

@media (max-width: 768px) {
  .title-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: absolute;
    width: 300px;
    height: 50px;
    left: 70px;
    top: 60px;
    color: white;
    z-index: 100;
  }

  .description {
    display: none;
  }
}

.title {
  font-size: 40px;
  font-weight: bold;
  margin-bottom: 20px;
}

@media (max-width: 768px) {
  .title {
    font-size: 15px;
    margin-bottom: 5px;
  }
}

.button-get-started {
  width: 120px;
  height: 40px;
  background: #ffffff;
  border-radius: 5px;
  border: none;
  color: rgb(0, 0, 0);
  font-size: 16px;
  cursor: pointer;
  z-index: 100;
}

.button-get-started:hover {
  background: #5a9e2b;
}

.button-get-started:active {
  background: #4a7e23;
}
</style>