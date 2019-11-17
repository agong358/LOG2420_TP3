
var data;
var consumerSeg;
var estimatedUsage;
var myChart;
var context = document.getElementById('myChart').getContext('2d');
var myChart2;
var context2 = document.getElementById('myChart2').getContext('2d');

function randomizeTable(table, reset) {
    if (reset)  //if want reset, return actual table
        return (table);

    //if input changed, return randomized table value fixed to 2 decimals.
    return ((table * Math.random()).toFixed(2));
}

panel = function (el, show, hide) {

    var x = document.getElementById(hide);
    var y = document.getElementById(show);
    x.style.display = "none";
    y.style.display = "block";
}

 function createChart(consumerSeg, estimatedUsage, randomize, reset) {
    var Population = [];
    var Volume_Baseline_Recontract = []
    var ARPU_Baseline_Recontract = []
    var Volume_Scenario_Recontract = []
    var ARPU_Scenario_Recontract = []
    var Volume_Baseline_NewCustomers = []
    var ARPU_Baseline_NewCustomers = []
    var Volume_Scenario_NewCustomers = []
    var ARPU_Scenario_NewCustomers = []

    if (randomize === true) {
        consumerSeg.forEach(obj => {
            Volume_Baseline_Recontract.push(randomizeTable(obj["Volume.Baseline.Recontract"], reset))
            Population.push(randomizeTable(obj["Population"], reset))
            ARPU_Baseline_Recontract.push(randomizeTable(obj["ARPU.Baseline.Recontract"]), reset)
            Volume_Scenario_Recontract.push(randomizeTable(obj["Volume.Scenario.Recontract"], reset))
            ARPU_Scenario_Recontract.push(randomizeTable(obj["ARPU.Scenario.Recontract"], reset))
            Volume_Baseline_NewCustomers.push(randomizeTable(obj["Volume.Baseline.NewCustomers"], reset))
            ARPU_Baseline_NewCustomers.push(randomizeTable(obj["ARPU.Baseline.NewCustomers"], reset))
            Volume_Scenario_NewCustomers.push(randomizeTable(obj["Volume.Scenario.NewCustomers"], reset))
            ARPU_Scenario_NewCustomers.push(randomizeTable(obj["ARPU.Scenario.NewCustomers"], reset))
        })
    }
    else {
        consumerSeg.forEach(obj => {
            Volume_Baseline_Recontract.push(obj["Volume.Baseline.Recontract"])
            Population.push(obj["Population"])
            ARPU_Baseline_Recontract.push(obj["ARPU.Baseline.Recontract"])
            Volume_Scenario_Recontract.push(obj["Volume.Scenario.Recontract"])
            ARPU_Scenario_Recontract.push(obj["ARPU.Scenario.Recontract"])
            Volume_Baseline_NewCustomers.push(obj["Volume.Baseline.NewCustomers"])
            ARPU_Baseline_NewCustomers.push(obj["ARPU.Baseline.NewCustomers"])
            Volume_Scenario_NewCustomers.push(obj["Volume.Scenario.NewCustomers"])
            ARPU_Scenario_NewCustomers.push(obj["ARPU.Scenario.NewCustomers"])
        })
    }


    //Conversion in percentage

    function conversionWithMax(array) {
        var max = 0;
        for (var i = 0; i < array.length; i++) {
            max += array[i]
        }
        for (var i = 0; i < array.length; i++) {
            array[i] = (array[i] * 100) / max;
        }
    }

    function conversion(array) {
        for (var i = 0; i < array.length; i++) {
            array[i] = (array[i] * 100);
        }
    }
    conversion(Population)
    conversion(Volume_Baseline_Recontract)
    conversionWithMax(ARPU_Baseline_Recontract)
    conversion(Volume_Scenario_Recontract)
    conversionWithMax(ARPU_Scenario_Recontract)
    conversion(Volume_Baseline_NewCustomers)
    conversionWithMax(ARPU_Baseline_NewCustomers)
    conversion(Volume_Scenario_NewCustomers)
    conversionWithMax(ARPU_Scenario_NewCustomers)


    // Global Options
    Chart.defaults.global.defaultFontFamily = 'Arial';
    Chart.defaults.global.defaultFontSize = 10;
    Chart.defaults.global.defaultFontColor = '#777';

    var createdChart = null;
    document.getElementById("side-left").addEventListener("change", function () {
        barDiagram()
        createPieChart()
    })
    document.getElementById("barDiargram").addEventListener("click", function () {
        barDiagram()
    })


    var select = document.getElementById("activitySelector");
    select.addEventListener("change", function () {
        createPieChart()
    })


    function createPieChart(){
            switch (select.value) {
                case "Population":
                    afficherDiagrammeCirculaire(Population)
                    break;
                case "Volume_Baseline_Recontract":
                    afficherDiagrammeCirculaire(Volume_Baseline_Recontract)
                    break;
                case "ARPU_Baseline_Recontract":
                    afficherDiagrammeCirculaire(ARPU_Baseline_Recontract)
                    break;
                case "Volume_Scenario_Recontract":
                    afficherDiagrammeCirculaire(Volume_Scenario_Recontract)
                    break;
                case "ARPU_Scenario_Recontract":
                    afficherDiagrammeCirculaire(ARPU_Scenario_Recontract)
                    break;
                case "Volume_Baseline_NewCustomers":
                    afficherDiagrammeCirculaire(Volume_Baseline_NewCustomers)
                    break;
                case "ARPU_Baseline_NewCustomers":
                    afficherDiagrammeCirculaire(ARPU_Baseline_NewCustomers)
                    break;
                case "Volume_Scenario_NewCustomers":
                    afficherDiagrammeCirculaire(Volume_Scenario_NewCustomers)
                    break;
                case "ARPU_Scenario_NewCustomers":
                    afficherDiagrammeCirculaire(ARPU_Scenario_NewCustomers)
                    break;
                default:
                // code block
            }
    }
    

    var data_ = {
        type: 'bar',
        data: {
            labels: ['Digital Dynamos', 'Top-end Techtastics', 'Indulgent Imitators', 'Savvy Surfers', 'Price Prioritisers',
                'Hesitant Homebodies'],
            datasets: [
                {
                    label: 'Population',
                    data: Population,
                    backgroundColor: 'rgba(255, 99, 132, 0.6)',
                    borderWidth: 1,
                    borderColor: '#777',
                    hoverBorderWidth: 3,
                    hoverBorderColor: '#000'
                }, {
                    label: 'Volume.Baseline.Recontract',
                    data: Volume_Baseline_Recontract,
                    backgroundColor: "rgba(100, 99, 132, 0.6)",
                    borderWidth: 1,
                    borderColor: '#777',
                    hoverBorderWidth: 3,
                    hoverBorderColor: '#000',
                },
                {
                    label: 'ARPU.Baseline.Recontract',
                    data: ARPU_Baseline_Recontract,
                    backgroundColor: "rgba(200, 200, 132, 0.6)",
                    borderWidth: 1,
                    borderColor: '#777',
                    hoverBorderWidth: 3,
                    hoverBorderColor: '#000'
                },
                {
                    label: 'Volume.Scenario.Recontract',
                    data: Volume_Scenario_Recontract,
                    backgroundColor: "rgba(200, 100, 100, 0.6)",
                    borderWidth: 1,
                    borderColor: '#777',
                    hoverBorderWidth: 3,
                    hoverBorderColor: '#000'
                },
                {
                    label: 'ARPU.Scenario.Recontract',
                    data: ARPU_Scenario_Recontract,
                    backgroundColor: "rgba(200, 100, 200, 0.7)",
                    borderWidth: 1,
                    borderColor: '#777',
                    hoverBorderWidth: 3,
                    hoverBorderColor: '#000'
                },
                {
                    label: 'Volume.Baseline.NewCustomers',
                    data: Volume_Baseline_NewCustomers,
                    backgroundColor: "rgba(100, 100, 100, 0.6)",
                    borderWidth: 1,
                    borderColor: '#777',
                    hoverBorderWidth: 3,
                    hoverBorderColor: '#000'
                },
                {
                    label: 'ARPU.Baseline.NewCustomers',
                    data: ARPU_Baseline_NewCustomers,
                    backgroundColor: "rgba(150, 10, 50, 0.6)",
                    borderWidth: 1,
                    borderColor: '#777',
                    hoverBorderWidth: 3,
                    hoverBorderColor: '#000'
                },
                {
                    label: 'Volume.Scenario.NewCustomers',
                    data: Volume_Scenario_NewCustomers,
                    backgroundColor: "rgba(100, 150, 50, 0.6)",
                    borderWidth: 1,
                    borderColor: '#777',
                    hoverBorderWidth: 3,
                    hoverBorderColor: '#000'
                },
                {
                    label: 'ARPU.Scenario.NewCustomers',
                    data: ARPU_Scenario_NewCustomers,
                    backgroundColor: "rgba(00, 150, 50, 0.6)",
                    borderWidth: 1,
                    borderColor: '#777',
                    hoverBorderWidth: 3,
                    hoverBorderColor: '#000'
                },


            ]

        },


        options: {
            title: {
                display: true,
                text: 'Entreprise',
                fontSize: 25
            },
            scales: {
                yAxes: [{
                    ticks: {
                        min: 0
                    }
                }]
            },
            legend: {
                display: true,
                position: 'top',
                labels: {
                    fontColor: '#000'
                }
            },
            layout: {
                padding: {
                    left: 0,
                    right: 50,
                    bottom: 0,
                    top: 0
                }
            },
            tooltips: {
                enabled:  true
            }
        }
    }   



    function afficherDiagrammeCirculaire(array) {
        var data2_ = {
            type: 'pie',
            data: {
                labels: ['Digital Dynamos', 'Top-end Techtastics', 'Indulgent Imitators', 'Savvy Surfers', 'Price Prioritisers',
                    'Hesitant Homebodies'],
                datasets: [{
                    label: "Hey",
                    backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
                    data: array
                }]
            },
            options: {
                title: {
                    display: true,
                    text: 'Comparaisons'
                }
            }
    
        }

        myChart2 && myChart2.destroy()
        myChart2 = new Chart(context2, data2_);
        
    }

    //let massPopChart
    function barDiagram() {
        myChart && myChart.destroy()
        myChart = new Chart(context, data_)
             
    }
}
