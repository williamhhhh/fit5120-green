<template>
  <canvas ref="canvas" width="600" height="340"></canvas>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { Chart, LineController, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js'
Chart.register(LineController, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend)
const props = defineProps({ slider: Number })
const canvas = ref()
let chart

const baseData = [200, 320, 210, 350, 280, 310, 290, 240, 200]
const years = [2013, 2015, 2016, 2017, 2018, 2022, 2023, 2024, 2025]

function getReducedData(slider) {
  const factor = 1 - slider * 0.06
  return baseData.map(v => Math.round(v * factor))
}

function renderChart() {
  if (chart) chart.destroy()
  chart = new Chart(canvas.value, {
    type: 'line',
    data: {
      labels: years,
      datasets: [
        {
          label: 'Before',
          data: baseData,
          borderColor: '#2a94e6',
          pointBackgroundColor: '#2a94e6',
          backgroundColor: '#2a94e633',
          fill: false,
          tension: 0.34
        },
        {
          label: 'Afterward',
          data: getReducedData(props.slider),
          borderColor: '#1ad18a',
          pointBackgroundColor: '#1ad18a',
          backgroundColor: '#1ad18a22',
          fill: false,
          tension: 0.34
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: true, position: 'top' },
        title: { display: false }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: { display: true, text: 'Energy consumption' }
        },
        x: { title: { display: true, text: '' } }
      }
    }
  })
}

onMounted(renderChart)
onBeforeUnmount(() => { if (chart) chart.destroy() })
watch(() => props.slider, renderChart)
</script>

<style scoped>
canvas {
  width: 100% !important;
  height: 340px !important;
  max-width: 680px;
  min-width: 320px;
  display: block;
  margin: 0 auto;
}
</style>