export async function fetchEnergyAccountData() {
  const res = await fetch('https://api.coolthecities.com/energy_account')
  return res.json()
}

export function transformResidentialToChartJsFormat(data, slider = 0) {
  const reductionRatio = slider * 0.01;
  const reducedResidential = data.residential.map(val =>
    parseFloat((val * (1 - reductionRatio)).toFixed(2))
  );

  return {
    title: 'Residential Energy Use (PJ) by Year',
    data: {
      labels: data.years,
      datasets: [
        {
          label: 'Residential (Current)',
          data: data.residential,
          borderColor: '#2a94e6',
          backgroundColor: '#2a94e633',
          fill: false,
          tension: 0.34,
        },
        {
          label: `Residential (AC reduced by ${slider}h)`,
          data: reducedResidential,
          borderColor: '#19b548',
          backgroundColor: '#19b54833',
          fill: false,
          tension: 0.34,
          hidden: slider === 0
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'Residential Energy Use (PJ) by Year'
        }
      },
      scales: {
        y: {
          beginAtZero: false,
          min: 800,
          max: 1200,
          title: { display: true, text: 'Energy use (PJ)' }
        },
        x: { title: { display: true, text: 'Year' } }
      }
    }
  }
}