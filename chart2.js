let chart2; // Reference to Bar Chart

// Function to render Bar Chart
function renderChart2(data) {
    const countryVisitorMap = {};

    data.forEach(row => {
        const country = row['country'];
        const totalVisitors = parseInt(row['adults']) + parseInt(row['children']) + parseInt(row['babies']);
        countryVisitorMap[country] = (countryVisitorMap[country] || 0) + totalVisitors;
    });

    const countries = Object.keys(countryVisitorMap);
    const visitors = Object.values(countryVisitorMap);

    if (chart2) {
        chart2.destroy();
    }

    const options2 = {
        series: [{ name: 'Visitors', data: visitors }],
        chart: { height: 250, type: 'bar' },
        xaxis: { categories: countries },
        title: { text: 'Number of Visitors per Country', align: 'left' },
        dataLabels: { 
            enabled: false
        }
    };

    chart2 = new ApexCharts(document.querySelector("#chart2"), options2);
    chart2.render();
}
