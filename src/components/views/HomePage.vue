<template>
  
  <div class="container-fluid">
    <div class="desc-container col-md-12 col-lg-12">
      <img src="https://i.imgur.com/jYx4z1b.jpeg" alt="green" class="green-city">
      <div class="title-container col-md-8 col-lg-8">
        <div class="cycle-container">
          <img src="@/assets/images/cycle.png" alt="cycle" class="cycle">
        </div>
        <div class="title-start">
          <h1 class="title">Melbourne is Getting Hotter - Let's Cool It Down Together</h1>
        </div>
        <div class="title-description-start">
          <p class="title-description">
          Join us in tackling urban heat and reducing CO2 emissions through small, everyday actions.
          </p>
          <img src="@/assets/images/ballon.png" alt="ballon" class="ballon">
        </div>


        <button @click="navigateTo('/GreenMap')" class="button-get-started">Let's tackle it!</button>
      </div>
    </div>
  </div>

  <div class="container-fluid graph-section">
    <div class="graph-section-title-container row">
        <div class="graph-section-title-text col-8 col-md-12">
          <div>Melbourne Minimum Temperatures by Year (Gradient)</div>
        </div>
    </div>
    <div class="row graph-container">
      <div class="col-12 col-md-4">
        <div class="graph-title">Do you know that Melbourne had heated up 6 degrees in recent years?</div>
        <div class="graph-description">
          <p>Melbourne's minimum temperatures have been rising over the years. This chart shows the trend of minimum temperatures from 2010 to 2020, with a gradient color scheme representing the years.</p>
        </div>
        <div class="button-cool-container">
          <button class="button-cool">
          <router-link to="/GreenMap" class="cool">Let's tackle it!</router-link>
          </button>
        </div>
      </div>
      <div class="col-12 col-md-8">
      <canvas ref="tempMinChart" id="tempChart" width="1000" height="500" position="relative"></canvas>
      <div class="year-gradient-legend">
        <span>{{ minYear }}</span>
        <div class="year-gradient-bar"></div>
        <span>{{ maxYear }}</span>
      </div>
      </div>
    </div>
  </div>
    
</template>
  
  <script setup>
import { onMounted, ref, nextTick } from 'vue'
import { Chart } from 'chart.js/auto'
// import cycle from '@/assets/images/cycle.png'

const tempMinChart = ref(null) // this holds the <canvas> element
let chartInstance = null


onMounted(async () => {
  const res = await fetch('https://api.coolthecities.com/temp_min')
  const data = await res.json()

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  const minYear = Math.min(...data.map(d => d.year))
  const maxYear = Math.max(...data.map(d => d.year))

  const startColor = [0, 100, 255]
  const endColor = [255, 0, 0]

  const interpolateColor = (start, end, factor) =>
    `rgb(${start.map((s, i) => Math.round(s + factor * (end[i] - s))).join(',')})`

  const datasets = data.map(row => {
    const factor = (row.year - minYear) / (maxYear - minYear)
    const color = interpolateColor(startColor, endColor, factor)
    return {
      label: row.year.toString(),
      data: months.map(m => row[m.toLowerCase()]),
      borderColor: color,
      backgroundColor: color,
      borderWidth: 1,
      fill: false,
      pointRadius: 0
    }
  })

  await nextTick() // ensure canvas is rendered

  if (tempMinChart.value) {
    chartInstance = new Chart(tempMinChart.value, {
      type: 'line',
      data: {
        labels: months,
        datasets
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Melbourne Minimum Temperatures by Year (Gradient)'
          },
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            min: 0,
            max: 20,
            title: {
              display: true,
              text: 'Temperature (°C)'
            }
          }
        }
      }
    })
  } else {
    console.error('❌ tempChart canvas element not found.')
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
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-self: center;
    width: 600px;
    padding: 0px;
    gap: 16px;
    z-index: 100;
    position: absolute;
    margin-bottom: 150px;
    /* width: 724px;
    height: 265px;
    left: 442px;
    top: 326px; */

  }

  .tittle-start {
    display: flex;
    justify-content: flex-start;
    gap: 0px;
  }

  .title{
    font-family: 'Domaine Display Narrow';
    font-style: italic;
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
    font-family: 'Be Vietnam Pro';
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

    width: 402px;
    height: 52px;

    background: #90CF8E;
    border-radius: 48px;
    border: none;
    cursor: pointer;
    z-index: 100;
    animation: tracking-in-expand-fwd 1s cubic-bezier(0.215, 0.61, 0.355, 1) both;
    animation-delay: 2s;
  }
  
  .button-get-started:hover {
    background: #5a9e2b;
  }
  
  .button-get-started:active {
    background: #4a7e23;
  }

  .year-gradient-legend {
  display: flex;
  align-items: center;
  margin-top: 10px;
  gap: 10px;
  font-size: 14px;
}

.year-gradient-bar {
  flex-grow: 1;
  height: 16px;
  background: linear-gradient(to right, rgb(0, 100, 255), rgb(255, 0, 0));
  border-radius: 8px;
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
}

.ballon {
  /* Go Green Air Balloon */

  position: absolute;
  right: -20px;       /* Adjust as needed */
  bottom: -40px;      /* Adjust as needed */
  width: 182px;
  height: 185px;
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
  padding: 10px;
}

.graph-title{
  font-family: 'DM Serif Display';
  font-style: normal;
  font-weight: 400;
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
  font-family: 'DM Sans';
  font-style: normal;
  font-weight: 600;
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
  padding: 0px;
  gap: 10px;

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

background: #90CF8E;
border-radius: 48px;
}

.cool{
  font-family: 'DM Sans';
font-style: normal;
font-weight: 600;
font-size: 16px;
line-height: 24px;
/* identical to box height, or 150% */
display: flex;
align-items: center;

color: #000000;
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


  </style>