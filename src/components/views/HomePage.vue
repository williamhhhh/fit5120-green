<template>
  <!-- Intro section with background image and animated title -->
  <div class="container-fluid">
    <div class="desc-container col-12 col-md-12 col-lg-12">
      <img src="@/assets/images/green_city.jpeg" alt="green" class="green-city">
      <div class="title-container col-md-8 col-lg-8">
        <!-- Animated cyclist image -->
        <div class="cycle-container">
          <img src="@/assets/images/cycle.png" alt="cycle" class="cycle animate__animated animate__lightSpeedInLeft">
        </div>
        <!-- Main campaign title -->
        <div class="title-start">
          <h1 class="title">Melbourne is Getting Hotter - Let's Cool It Down Together</h1>
        </div>
        <!-- Subtitle and animated balloon image -->
        <div class="title-description-start">
          <p class="title-description">
            Join us in tackling urban heat and reducing CO2 emissions through small, everyday actions.
          </p>
          <img src="@/assets/images/ballon.png" alt="ballon" class="ballon animate__animated animate__bounceInUp">
        </div>
        <!-- CTA button scrolls to chart section -->
        <button @click="scrollToSection" class="button-get-started animate__animated animate__fadeIn">Let's learn more!</button>
      </div>
    </div>
  </div>

  <!-- Graph section with two toggleable cards -->
  <div class="container-fluid graph-section">
    <!-- Section title -->
    <div class="graph-section-title-container row">
      <div class="graph-section-title-text col-8 col-md-12">
        <div>Melbourne had increased by <span class="heat-highlight">6 degrees</span> in recent years</div>
      </div>
    </div>

    <!-- Temperature chart card -->
    <div v-if="isTemp" class="row graph-container animate__animated animate__fadeInRight">
      <!-- Arrows for toggling cards -->
      <div class="col-1 col-md-1 arrow-container-left" @click="transistCard()">
        <img src="@/assets/images/left.png" alt="arrow" class="arrow">
      </div>
      <div class="col-1 col-md-1 arrow-container">
        <img src="@/assets/images/left.png" alt="arrow" class="arrow" @click="transistCard()">
      </div>

      <!-- Description column -->
      <div class="col-10 col-md-3">
        <div class="graph-title">Do you know that Melbourne had heated up 6 degrees in recent years?</div>
        <div class="graph-description">
          <p>The overall gradient trends of Melbourne's <span class="highlight-desc">minimal</span> and <span class="highlight-desc">maximal</span> temperature in each month show how temperature has been rising in recent years.</p>
        </div>
        <!-- CTA button to learn more -->
        <div class="button-cool-container">
          <button class="button-cool">
            <router-link to="/info" class="cool">Let's tackle it!</router-link>
          </button>
        </div>
      </div>

      <!-- Right arrows for toggling -->
      <div class="col-1 col-md-1 arrow-container-right" @click="transistCard()">
        <img src="@/assets/images/right.png" alt="arrow" class="arrow">
      </div>

      <!-- Chart canvas and legend -->
      <div class="col-12 col-md-7 chart-container">
        <canvas ref="tempChart" id="tempChart" position="relative"></canvas>
        <div class="year-gradient-legend">
          <span>2024</span>
          <div class="year-gradient-bar"></div>
          <span>1944</span>
        </div>
      </div>

      <!-- Extra right arrow for small screen support -->
      <div class="col-1 col-md-1 arrow-container" @click="transistCard()">
        <img src="@/assets/images/right.png" alt="arrow" class="arrow">
      </div>
    </div>

    <!-- Greenhouse gas chart card -->
    <div v-if="!isTemp" class="row graph-container animate__animated animate__fadeInRight">
      <!-- Arrows for toggling -->
      <div class="col-1 col-md-1 arrow-container-left" @click="transistCard()">
        <img src="@/assets/images/left.png" alt="arrow" class="arrow">
      </div>
      <div class="col-1 col-md-1 arrow-container">
        <img src="@/assets/images/left.png" alt="arrow" class="arrow" @click="transistCard()">
      </div>

      <!-- Description column -->
      <div class="col-10 col-md-3">
        <div class="graph-title">Do you know that we are still a long way to greenhouse gas neutral?</div>
        <div class="graph-description">
          <p>Since 2010, greenhouse gas emissions have started to decline. However, we are still approximately 80 Mts away from carbon neutral.</p>
        </div>
        <!-- CTA button to go to calculator -->
        <div class="button-cool-container">
          <button class="button-cool">
            <router-link to="/info" class="cool">Let's tackle it!</router-link>
          </button>
        </div>
      </div>

      <!-- Right arrow -->
      <div class="col-1 col-md-1 arrow-container-right" @click="transistCard()">
        <img src="@/assets/images/right.png" alt="arrow" class="arrow">
      </div>

      <!-- Chart canvas -->
      <div class="col-10 col-md-7 chart-container">
        <canvas ref="greenChart" id="greenChart" position="relative"></canvas>
      </div>

      <!-- Extra arrow for small screens -->
      <div class="col-1 col-md-1 arrow-container">
        <img src="@/assets/images/right.png" alt="arrow" class="arrow" @click="transistCard()">
      </div>
    </div>
  </div>
</template>

<script setup>
// Import Vue Composition API tools and lifecycle hooks
import { onMounted, ref, nextTick, onBeforeUnmount, watch } from 'vue'
// Import Chart.js
import { Chart } from 'chart.js/auto'
// Import data fetching and transformation utilities
import { fetchMinData, fetchMaxData, transformToChartJsFormat } from '../utils/tempChart'
import { renderGreenGasChart } from '../utils/greenGasChart'

// Refs for chart canvas elements
const tempChart = ref(null)
const greenChart = ref(null)

// Chart instances
let chartInstance = null
let greenChartInstance = null

// Controls which temperature data is shown (min or max)
let isShowingMin = true

// Interval ID for automatic chart cycling
let intervalId = null

// Toggles between temp and greenhouse gas cards
const isTemp = ref(true)

// Toggle card type
const transistCard = () => {
  isTemp.value = !isTemp.value
}

// Scrolls to graph section smoothly
const scrollToSection = () => {
  const section = document.querySelector('.graph-section')
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' })
  }
}

// Render temperature line chart
const renderChart = async () => {
  const canvas = tempChart.value
  if (!canvas) return

  const data = isShowingMin ? await fetchMinData() : await fetchMaxData()
  const chartData = transformToChartJsFormat(data, isShowingMin)

  if (chartInstance) {
    // Update existing chart with new data and title
    chartInstance.data = chartData.data
    chartInstance.options.plugins.title.text = chartData.title
    chartInstance.options.scales = {
      ...chartInstance.options.scales,
      y: chartData.options.scales.y
    }
    chartInstance.update()
  } else {
    // Create a new chart instance
    chartInstance = new Chart(canvas, {
      type: 'line',
      data: chartData.data,
      options: chartData.options,
    })
  }

  // Alternate between min and max data every cycle
  isShowingMin = !isShowingMin
}

// Render appropriate chart on mount
onMounted(async () => {
  await nextTick()

  if (isTemp.value) {
    await renderChart()
    intervalId = setInterval(renderChart, 8000)
  }
})

// Watch for card toggle changes
watch(isTemp, async (newVal) => {
  await nextTick()

  if (newVal) {
    // Show temperature chart
    if (tempChart.value) {
      if (chartInstance) {
        chartInstance.destroy()
        chartInstance = null
      }
      if (intervalId === null) {
        intervalId = setInterval(renderChart, 8000)
      }
      await renderChart()
    }
  } else {
    // Show greenhouse gas chart
    if (intervalId) {
      clearInterval(intervalId)
      intervalId = null
    }
    if (greenChart.value) {
      if (greenChartInstance) {
        greenChartInstance.destroy()
      }
      greenChartInstance = await renderGreenGasChart(greenChart.value)
    }
  }
})
</script>

  
  <style scoped>
  @keyframes tracking-in-expand-fwd {
    0% {
      letter-spacing: -0.5em;
      -webkit-transform: translateZ(-700px);
              transform: translateZ(-700px);
      opacity: 0;
    }
    40% {
      opacity: 0.6;
    }
    100% {
      -webkit-transform: translateZ(0);
              transform: translateZ(0);
      opacity: 1;
    }
  }
  
  @keyframes tracking-in-contract-bck-bottom {
    0% {
      letter-spacing: 1em;
      -webkit-transform: translateZ(400px) translateY(300px);
              transform: translateZ(400px) translateY(300px);
      opacity: 0;
    }
    40% {
      opacity: 0.6;
    }
    100% {
      -webkit-transform: translateZ(0) translateY(0);
              transform: translateZ(0) translateY(0);
      opacity: 1;
    }
  }

  .container-fluid{
    padding: 0;
    margin: 0;
  }


  
  .desc-container {
    position: relative;
    width: 100%;
    display: flex;

    min-height: 100vh;
    margin: auto;
    justify-content: center; /* centers horizontally */
    align-items: center;     /* centers vertically */
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


  .title-container {
  width: 90%;
  max-width: 600px;
  margin: 0 auto;
  padding: 16px;
  position: relative;
  z-index: 100;
}


  .tittle-start {
    display: flex;
    justify-content: flex-start;
    gap: 0px;
  }

  .title{
    font-family: 'DM Serif Display';
    font-weight: 600;
    font-size: 70px;
    line-height: 66px;
    width: 130%;

    /* or 94% */
    display: flex;
    align-items: center;

    color: #FFFFFF;
  }

  .title-description-start {
    display: flex;
    justify-content: flex-start;
    position: relative;
    align-items: center;
    flex-direction: row;
    gap: 10px;
  }

  .title-description{
    font-family: 'DM Serif Display';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 28px;
    width: 80%;
    /* or 156% */
    display: flex;
    align-items: center;

    color: #FFFFFF;
  }

  
  
  .button-get-started {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-family: 'DM Sans';
    font-weight: 600;
    width: 402px;
    height: 52px;

    background: #75BE3A;
    color: #fff;
    border: none;
    border-radius: 20px;
    transform: scale(1);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, background-color 0.3s ease;
    /* animation: tracking-in-expand-fwd 1s cubic-bezier(0.215, 0.61, 0.355, 1) both; */
    animation-delay: 1s;
  }
  
  .button-get-started:hover {
    cursor: pointer;
    background: #70ce23;
    transform: scale(1.1);

  }
  
  .button-get-started:active {
    background: #bcff89;
  }

.cycle-container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
}

.cycle {
  position: relative;
  width: 238px;
  height: 197px;
  animation-delay: 0.3s;
}

.ballon {
  /* Go Green Air Balloon */

  position: absolute;
  right: -40px;       /* Adjust as needed */
  bottom: -80px;      /* Adjust as needed */
  width: 182px;
  height: 185px;
  animation-delay: 0.3s;
}


.graph-section-title-container{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.graph-section-title-text{
  margin-top: 40px;
  margin-bottom: 20px;
  font-family: 'DM Serif Display';
  font-style: bold;
  font-weight: 400;
  font-size: 48px;
  line-height: 150%;
  /* or 72px */
  text-align: center;

  color: #000000;
}

.graph-container{
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.3);
  border-radius: 40px;
  width: 90%;
  padding-top: 50px;
  padding-bottom: 50px;
}

.graph-title{
  font-family: 'DM Serif Display';
  font-style: normal;
  font-weight: 600;
  font-size: 32px;
  line-height: 150%;
  /* or 48px */
  text-align: center;

  color: #000000;
  margin-top: 50px;
}

.graph-description{
  margin-top: 40px;
  margin-bottom: 40px;
  margin-left: 20px;
  margin-right: 20px;

  font-family: 'DM Sans';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  /* or 150% */
  display: flex;
  align-items: center;

  color: #000000;

}

.button-cool-container{

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0px;
  gap: 10px;
  margin-top: 60px;

}

.button-cool{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 14px 22px;
  gap: 12px;
  width: 70%;
  height: 65px;
  background: #75BE3A;
  color: #fff;
  border: none;
  border-radius: 20px;
  transform: scale(1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, background-color 0.3s ease;
}

.button-cool:hover {
  cursor: pointer;
  background: #70ce23;
  transform: scale(1.1);
}

.button-cool:active {
  background: #bcff89;
}

.cool{
  font-family: 'DM Sans';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  text-decoration: none;

  /* identical to box height, or 150% */
  display: flex;
  align-items: center;


  color: #ffffff;
}
.container{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 90%;
}

.graph-section{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.chart-container {
  display: flex;
  flex-direction: row;
  gap: 10px;
}

.year-gradient-legend {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 10px;
  gap: 10px;
  font-size: 14px;
}

.year-gradient-bar {
  flex-grow: 1;
  background: linear-gradient(to top, rgb(0, 100, 255), rgb(255, 0, 0));
  border-radius: 8px;
  z-index: 1000;
  height: 100%;
  width: 100%;
  margin-right: 20px;
}

.arrow-container {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.arrow {
  width: 66px;
  height: 61px;
}

.arrow-container-right {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  display: none;
}

.arrow-container-left {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  display: none;
}

.arrow:hover {
  cursor: pointer;
  transform: scale(1.2);
  transition: background 0.5s ease;
}

.highlight-desc {
  color: #75BE3A;  /* Green color */
  font-weight: bold;
  font-size: 1.2em;
  padding: 2px 4px;
  border-radius: 4px;
}



/* <div class="container-fluid graph-section">
    <div class="graph-section-title-container row">
        <div class="graph-section-title-text col-8 col-md-12">
          <div class >Melbourne had increased <span class="heat-highlight">6 degrees</span> in recent years</div>
        </div>
    </div>

    <div v-if="isTemp" class="row graph-container animate__animated animate__fadeInRight">
      <div class="col-12 col-md-1 arrow-container">
        <img src="@/assets/images/left.png" alt="arrow" class="arrow" @click="transistCard()">
      </div>

      <div class="col-12 col-md-3">
        <div class="graph-title">Do you know that Melbourne had heated up 6 degrees in recent years?</div>
        <!-- <div class="graph-description">
          <p>The overall gradient trends of melbourne's <span class="highlight-desc">minimal</span> and <span class="highlight-desc">maximal</span> temperature in each months show how temperature had been going up in melbourne in recent years</p>
        </div> -->
        <div class="button-cool-container">
          <button class="button-cool">
          <router-link to="/GreenMap" class="cool">Let's tackle it!</router-link>
          </button>
        </div>
      </div> */

@media (max-width: 768px) {

  .graph-title {
    font-size: 15px;
    line-height: 1.2;
    width: 100%;
  }

  .graph-section-title-text {
    font-size: 15px;
    line-height: 1.2;
    width: 100%;
  }
  .arrow {
    width: 40px;
    height: 40px;
  }

  .arrow-container{
    display: none;
  }

  .arrow-container-left{
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }

  .arrow-container-right{
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
  .cycle {
    display: none;
  }

  .ballon {
    display: none;
  }
  .title {
    font-size: 36px;
    text-align: center;
    line-height: 1.2;
    width: 100%;
  }

  .title-description {
    font-size: 16px;
    line-height: 1.4;
    width: 100%;
    text-align: center;
  }

  .button-get-started {
    width: 90%;
  }

  .graph-section-title-text{
    font-size: 32px;
  }

  .year-gradient-legend{
    display: none;
  }

  .desc-container {
    min-height: auto;
  }
}

.heat-highlight {
  color: #ff2e39;  /* Green color */
  font-weight: bold;
  font-size: 1.2em;
  padding: 2px 4px;
  border-radius: 4px;
}

canvas#greenChart {
  width: 100% !important;
  height: 400px !important;
}



  </style>