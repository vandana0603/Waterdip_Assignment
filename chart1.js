let fullTimeSeriesData = [];
let chart1;

document.getElementById('uploadCSV').addEventListener('change', function(event) {
    const file = event.target.files[0];

    if (!file) {
        console.log("No file uploaded.");
        return;
    }

    Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: function(results) {
            fullTimeSeriesData = results.data;
            renderChart1(fullTimeSeriesData);
            renderChart2(fullTimeSeriesData);
        }
    });
});

function renderChart1(data) {
    const dates = [];
    const visitors = [];

    data.forEach(row => {
        const date = new Date(`${row['arrival_date_year']}-${row['arrival_date_month']}-${row['arrival_date_day_of_month']}`);
        if (!isNaN(date.getTime())) {
            dates.push(date.getTime());
            const totalVisitors = parseInt(row['adults']) + parseInt(row['children']) + parseInt(row['babies']);
            visitors.push(totalVisitors);
        }
    });

    if (chart1) {
        chart1.destroy();
    }

    const options1 = {
        series: [{ name: 'Visitors', data: visitors }],
        chart: { type: 'area', height: 250, zoom: { type: 'x', enabled: true }, toolbar: { autoSelected: 'zoom' } },
        xaxis: { type: 'datetime', categories: dates },
        title: { text: 'Number of Visitors per Day', align: 'left' },
        dataLabels: { enabled: false }
    };

    chart1 = new ApexCharts(document.querySelector("#chart1"), options1);
    chart1.render();
}
