import {
    Chart,
    LineController,
    LineElement,
    PointElement,
    LinearScale,
    Title,
    CategoryScale,
    Tooltip,
    Legend
  } from 'chart.js'
  
  Chart.register(
    LineController,
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Title,
    Tooltip,
    Legend
  )
  
  export async function renderGreenGasChart(canvasRef) {
    const res = await fetch('https://api.coolthecities.com/green_gas')
    const data = await res.json()
  
    if (data.error) throw new Error(data.error)
  
    const states = ["ACT", "ET", "NSW", "NT", "QLD", "SA", "TAS", "VIC", "WA"]
    const colors = [
      "#4caf50", "#2196f3", "#f44336", "#9c27b0", "#ff9800",
      "#00bcd4", "#8bc34a", "#ff5722", "#3f51b5"
    ]
  
    const datasets = states.map((state, i) => ({
      label: state,
      data: data[state],
      borderColor: colors[i],
      backgroundColor: colors[i],
      borderWidth: 2,
      fill: false,
      tension: 0.2,
      pointRadius: 0
    }))
  
    return new Chart(canvasRef, {
      type: 'line',
      data: {
        labels: data.years,
        datasets
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'State-wise Greenhouse Gas Emissions (Mt)'
          },
          legend: {
            display: true,
            position: 'bottom'
          }
        },
        scales: {
          y: {
            type: 'linear',
            title: {
              display: true,
              text: 'Emissions (Mt)'
            }
          },
          x: {
            type: 'category',
            title: {
              display: true,
              text: 'Year'
            }
          }
        }
      }
    })
  }
  