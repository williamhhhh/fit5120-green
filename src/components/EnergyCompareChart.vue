<template>
  <div style="width: 100%; max-width: 900px; margin: 0 auto;">
    <canvas ref="canvas" width="800" height="400"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Chart } from 'chart.js/auto'
import { fetchEnergyAccountData, transformEnergyAccountToChartJsFormat } from '../components/utils/energyAccount.js'

const canvas = ref(null)
let chartInstance = null

async function renderChart() {
  const data = await fetchEnergyAccountData()
  const chartData = transformEnergyAccountToChartJsFormat(data)

  if (chartInstance) chartInstance.destroy()
  chartInstance = new Chart(canvas.value, {
    type: 'line',
    data: chartData.data,
    options: chartData.options,
  })
}

onMounted(() => {
  renderChart()
})

onBeforeUnmount(() => {
  if (chartInstance) chartInstance.destroy()
})
</script>

<style scoped>
canvas {
  width: 100% !important;
  height: 400px !important;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px #0001;
  margin-top: 32px;
}
</style>