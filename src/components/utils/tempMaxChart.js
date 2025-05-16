import { Chart } from 'chart.js/auto'

export async function renderTempMaxChart(canvasRef) {
  const res = await fetch('https://api.coolthecities.com/temp_max')
  const data = await res.json()

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  const minYear = Math.min(...data.map(d => d.year))
  const maxYear = Math.max(...data.map(d => d.year))

  const startColor = [0, 100, 255] // blue
  const endColor = [255, 0, 0]     // red

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

  return new Chart(canvasRef, {
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
          text: 'Melbourne Maximum Temperatures by Year (Gradient)'
        },
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          min: 10,  // you can adjust this depending on your data
          max: 30,
          title: {
            display: true,
            text: 'Temperature (°C)'
          }
        }
      }
    }
  })
}
