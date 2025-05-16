 export async function fetchMinData() {
    const res = await fetch('https://api.coolthecities.com/temp_min')
    return res.json()
  }
  
 export async function fetchMaxData() {
    const res = await fetch('https://api.coolthecities.com/temp_max')
    return res.json()
  }
  
 export function transformToChartJsFormat(data, isMin) {
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
  
    return {
      title: isMin
        ? 'Melbourne Minimum Temperatures by Year (Gradient)'
        : 'Melbourne Maximum Temperatures by Year (Gradient)',
      data: {
        labels: months,
        datasets
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, // Prevent reflow/flicker
        plugins: {
          title: {
            display: true,
            text: '', // gets overwritten above
          },
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            min: isMin ? 0 : 10,
            max: isMin ? 20 : 30,
            title: {
              display: true,
              text: 'Temperature (°C)'
            }
          }
        }
      }
    }
  }
  