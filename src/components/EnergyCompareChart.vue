<template>
  <div style="width: 100%; max-width: 900px; margin: 0 auto;">
    <canvas ref="canvas" width="800" height="400"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { Chart } from 'chart.js/auto'
import { fetchEnergyAccountData, transformResidentialToChartJsFormat } from '../components/utils/energyAccount.js'

const props = defineProps({
  slider: { type: Number, default: 0 }
})

const canvas = ref(null)
let chartInstance = null
let latestRawData = null

async function initChart() {
  latestRawData = await fetchEnergyAccountData()
  const chartData = transformResidentialToChartJsFormat(latestRawData, props.slider)
  chartInstance = new Chart(canvas.value, {
    type: 'line',
    data: chartData.data,
    options: {
      ...chartData.options,
      animation: false
    },
  })
}

function updateCompareLine() {
  if (!chartInstance || !latestRawData) return
  const reductionRatio = props.slider * 0.01
  const reducedResidential = latestRawData.residential.map(val =>
    parseFloat((val * (1 - reductionRatio)).toFixed(2))
  )
  chartInstance.data.datasets[1].data = reducedResidential
  chartInstance.data.datasets[1].label = `Residential (AC reduced by ${props.slider}h)`
  chartInstance.data.datasets[1].hidden = props.slider === 0
  chartInstance.update('none')
}

onMounted(() => {
  initChart()
})

watch(() => props.slider, () => {
  updateCompareLine()
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