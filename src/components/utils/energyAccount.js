
export async function fetchEnergyAccountData() {
  const res = await fetch('https://api.coolthecities.com/energy_account')
  return res.json()
}

export function transformEnergyAccountToChartJsFormat(data) {
  return {
    title: 'Victoria Energy Use (PJ) by Year',
    data: {
      labels: data.years,
      datasets: [
        {
          label: 'Industry End Use (PJ)',
          data: data.industry_end_use,
          borderColor: '#2a94e6',
          backgroundColor: '#2a94e633',
          fill: false,
          tension: 0.34,
        },
        {
          label: 'Residential (PJ)',
          data: data.residential,
          borderColor: '#e6a42a',
          backgroundColor: '#e6a42a33',
          fill: false,
          tension: 0.34,
        },
        {
          label: 'Exports (PJ)',
          data: data.exports,
          borderColor: '#e62a2a',
          backgroundColor: '#e62a2a33',
          fill: false,
          tension: 0.34,
        },
        {
          label: 'Total Use (Net) (PJ)',
          data: data.total_use_net,
          borderColor: '#16ba5d',
          backgroundColor: '#16ba5d33',
          fill: false,
          tension: 0.34,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'Victoria Energy Use (PJ) by Year'
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: { display: true, text: 'Energy use (PJ)' }
        },
        x: { title: { display: true, text: 'Year' } }
      }
    }
  }
}