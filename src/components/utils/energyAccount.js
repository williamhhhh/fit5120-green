export async function fetchEnergyAccountData() {
  const res = await fetch('https://api.coolthecities.com/energy_account')
  return res.json()
}

export function transformResidentialToChartJsFormat(data, slider = 0) {
  const reductionPerHour = 98.55; // PJ
  const totalReduction = slider * reductionPerHour;

  const reducedResidential = data.residential.map(val =>
    Math.max(0, parseFloat((val - totalReduction).toFixed(2)))
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
          label: `Residential (AC reduced by ${slider}h, -${(totalReduction).toFixed(2)} PJ)`,
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
          min: 0,
          max: 1200,
          title: { display: true, text: 'Energy use (PJ)' }
        },
        x: { title: { display: true, text: 'Year' } }
      }
    }
  }
}