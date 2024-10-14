let sparklineDataAdult = [];
let sparklineDataChildren = [];

function renderSparklineCharts(data) {
    // Prepare data for Sparkline Charts
    sparklineDataAdult = [];
    sparklineDataChildren = [];

    data.forEach(row => {
        sparklineDataAdult.push(parseInt(row['adults']) || 0);
        sparklineDataChildren.push(parseInt(row['children']) || 0);
    });

    renderSparklineChart('#chart-spark1', sparklineDataAdult, 'Adult Visitors');
    renderSparklineChart('#chart-spark2', sparklineDataChildren, 'Children Visitors');
}

function renderSparklineChart(selector, data, label) {
    const options = {
        series: [{ data }],
        chart: {
            type: 'area',
            height: 265,
            sparkline: { enabled: true }
        },
        stroke: { curve: 'straight' },
        fill: { opacity: 0.3 },
        yaxis: { min: 0 },
        colors: ['#DCE6EC'],
        title: {
            text: `${data.reduce((a, b) => a + b, 0)}`,
            offsetX: 0,
            style: { fontSize: '24px' }
        },
        subtitle: {
            text: label,
            offsetX: 0,
            style: { fontSize: '14px' }
        },
        dataLabels: { enabled: false }
    };

    const chart = new ApexCharts(document.querySelector(selector), options);
    chart.render();
}
