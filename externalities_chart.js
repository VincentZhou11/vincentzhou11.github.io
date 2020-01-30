var mec = 0;
var meb = 0;
var mec_slider = document.getElementById("mec_slider");
var mec_text = document.getElementById("mec");
var meb_slider = document.getElementById("meb_slider");
var meb_text = document.getElementById("meb");

var externalities_ctx = document.getElementById("externalities_chart");

var externalities_chart = new Chart(externalities_ctx, {
    type: 'line',
    data: {
        "datasets": [
            {
                "label": "Private Equilibrium Point",
                "data": [{ x: 35, y: 35 }],
                "fill": false,
                "pointRadius": 5,
                "borderColor": "rgb(0, 0, 0)",
                "pointBackgroundColor": "rgb(0, 0, 0)"
            },
            {
                "label": "Socially Optimal Point",
                "data": [{ x: 35, y: 35 }],
                "fill": false,
                "pointRadius": 5,
                "borderColor": "rgb(122, 122, 122)",
                "pointBackgroundColor": "rgb(122, 122, 122)"
            },
            {
                "label": "Supply Curve",
                "data": generateSupplyVertShift(0),
                "fill": false,
                "borderColor": "rgb(255, 0, 0)",
                "pointBackgroundColor": "rgb(255, 0, 0)"
            },
            {
                "label": "Demand Curve",
                "data": generateDemandVertShift(0),
                "fill": false,
                "borderColor": "rgb(0, 0, 255)",
                "pointBackgroundColor": "rgb(0, 0, 255)"
            },
            {
                "label": "MSC",
                "data": generateSupplyVertShift(0),
                "fill": false,
                "borderColor": "rgb(122, 0, 0)",
                "pointBackgroundColor": "rgb(122, 0, 0)"
            },
            {
                "label": "MSB",
                "data": generateDemandVertShift(0),
                "fill": false,
                "borderColor": "rgb(0, 0, 122)",
                "pointBackgroundColor": "rgb(0, 0, 122)"
            },
        ]
    },
    options: {
        responsive: false,
        maintainAspectRatio: false,
        scales: {
            xAxes: [{
                display: true,
                type: 'linear',
                position: 'bottom',
                ticks: {
                    min: 0,
                    max: 70
                },
                scaleLabel: {
                    display: true,
                    labelString: 'Quantity'
                }
            }],
            yAxes: [{
                display: true,
                type: 'linear',
                position: 'bottom',
                ticks: {
                    min: 0,
                    max: 70,
                    callback: function (value, index, values) {
                        return '$' + value;
                    }
                },
                scaleLabel: {
                    display: true,
                    labelString: 'Price'
                }
            }]
        }
    }
});
function generateSupplyVertShift(shift) {
    var list = [];
    for (let i = 0; i < 8; i++) {
        list.push({ x: (i * 10.0), y: i * 10.0 + parseInt(shift)});
    }
    return list
}
function generateDemandVertShift(shift) {
    var list = [];
    for (let i = 0; i < 8; i++) {
        list.push({ x: (i * 10.0), y: 70.0 - i * 10.0 + parseInt(shift)});
    }
    return list
}

mec_slider.oninput = function () {
    mec_text.innerHTML = "MEC: " + this.value;
    mec = parseInt(this.value);
    update_externalities(mec, meb);
}
meb_slider.oninput = function () {
    meb_text.innerHTML = "MEB: " + this.value;
    meb = parseInt(this.value);
    update_externalities(mec, meb);
}

function update_externalities(mec, meb) {
    externalities_chart.data.datasets[4].data = generateSupplyVertShift(mec);
    externalities_chart.data.datasets[5].data = generateDemandVertShift(meb);


    x_e = (70 + meb - mec) / 2.0;
    y_e = x_e + mec;
    externalities_chart.data.datasets[1].data = [{
        x: x_e,
        y: y_e
    }];
    console.log(externalities_chart.data.datasets[1].data);
    //console.log("Updating demand");
    externalities_chart.update();
}