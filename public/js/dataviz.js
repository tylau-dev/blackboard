//Bar Chart
var bch = document.getElementById("barChart")
var bchData = [parseInt(bch.dataset.male), parseInt(bch.dataset.female)]
var bchLabels = ['Male', 'Female']

new Chart(bch, {
    type: 'bar',
    data: {
        datasets: [{
                label: 'Dataset Male',
                data: [bchData[0]]

                ,
                backgroundColor: [
                    '#c0392b', '#2980b9'
                ],
                borderColor: [
                    '#c0392b', '#2980b9'
                ],
                borderWidth: 2
            },
            {
                label: 'Dataset Female',
                data: [bchData[1]],
                backgroundColor: [
                    '#2980b9'
                ],
                borderColor: [
                    '#2980b9'
                ],
                borderWidth: 2
            }


        ]
    },
    options: {
        title: {
            display: true,
            text: "Nombre d'utilisateurs par sexe"
        },
        scales: {
            yAxes: [{
                ticks: {
                    suggestedMin: 0,
                }
            }]
        }
    }
})

//Message Chart
var msg = document.getElementById("doughnut");
var msgLabels = ['Read', 'Unread']
var msgData = [parseInt(msg.dataset.read), parseInt(msg.dataset.unread)]

new Chart(msg, {

    type: 'doughnut',
    data: {
        labels: msgLabels,
        datasets: [{

            data: msgData,
            backgroundColor: [
                '#2ecc71', '#e67e22'
            ],
            borderColor: [
                '#2ecc71', '#e67e22'
            ],
        }]
    },
    option: {
        title: {
            display: true,
            text: "Nombre de messages lus et non-lu"
        }
    }
});

//Pie Chart
var cmd = document.getElementById("pie");
var cmdLabels = ['Expédiée', 'Non expédiée']
var cmdData = [parseInt(cmd.dataset.ship), parseInt(cmd.dataset.notship)]

new Chart(cmd, {

    type: 'pie',
    data: {
        labels: cmdLabels,
        datasets: [{

            data: cmdData,
            backgroundColor: [
                '#16a085', '#f1c40f'
            ],
            borderColor: [
                '#16a085', '#f1c40f'
            ],
        }]
    },
    option: {
        title: {
            display: true,
            text: "Cmd expédiées/non expédiées"
        }
    }

});

//Line chart
var line = document.getElementById("line")
var lineJSON = JSON.parse(line.dataset.sales)

const labelTurnover = [];
const points = [];

//Récupérer le JSON 
var dataTurnover = JSON.parse(line.dataset.sales)

// Filtrer les éléments nuls car ils bloquent le tri
var filtered = dataTurnover.filter(function(el) { return el._id.sales_month != null })
console.log("Pas filtré", filtered)
    // Générer les dates à partir des éléments année et mois
filtered.forEach((data) => {
    data.date = new Date(`${data._id.sales_year}, ${data._id.sales_month}`);
    labelTurnover.push(`${data._id.sales_month}/${data._id.sales_year}`);
    points.push(data.total);
});

// Trier le tableau sur les dates (a - b par ordre croissant)
const sortedData = filtered.slice(0).sort((a, b) => a._id.sales_month - b._id.sales_month);
console.log("Filtré", sortedData)

var lineLabels = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
var lineData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

for (i = 0; i < lineJSON.length; i++) {
    switch (lineJSON[i]._id.sales_month) {
        case 1:
            lineData[0] = lineJSON[i].total
            break;
        case 2:
            lineData[1] = lineJSON[i].total
            break;
        case 3:
            lineData[2] = lineJSON[i].total
            break;
        case 4:
            lineData[3] = lineJSON[i].total
            break;
        case 5:
            lineData[4] = lineJSON[i].total
            break;
        case 6:
            lineData[5] = lineJSON[i].total
            break;
        case 7:
            lineData[6] = lineJSON[i].total
            break;
        case 8:
            lineData[7] = lineJSON[i].total
            break;
        case 9:
            lineData[8] = lineJSON[i].total
            break;
        case 10:
            lineData[9] = lineJSON[i].total
            break;
        case 11:
            lineData[10] = lineJSON[i].total
            break;
        case 12:
            lineData[11] = lineJSON[i].total
            break;
    }
}

console.log(lineData)

new Chart(line, {
    type: 'line',
    data: {
        labels: lineLabels,
        datasets: [{
            label: 'CA',
            data: lineData
        }],
        fill: false
    },
    option: {
        title: {
            display: true,
            text: "CA Mensuel"
        }
    }
})

// var test = document.getElementById("test")

// var firstChart = new Chart(test, {
//     type: 'line',
//     data: {
//         labels: ['a', 'b'],
//         datasets: [{
//                 label: "1er graphe",
//                 data: [100, 200],
//                 backgroundColor: '#f8c291',
//                 borderColor: '#e55039'
//             },
//             {
//                 label: "2e graphe",
//                 data: [200, 400],
//                 backgroundColor: '#f8c291',
//                 borderColor: '#e55039'
//             },
//             {
//                 label: "3e graphe",
//                 data: [400, 600],
//                 backgroundColor: '#f8c291',
//                 borderColor: '#e55039'
//             }
//         ]
//     },
//     options: {
//         scales: {
//             yAxes: [{
//                 ticks: {
//                     beginAtZero: true
//                 }
//             }]
//         },
//         legend: {
//             display: false,
//         }
//     }
// });

// var userCountByMonthLabels = []
// var userCountByMonthDataResults = []

// for (var i = 0; i < lineJSON.length; i++) {
//     var date = new Date((lineJSON[i]._id.sales_year), (lineJSON[i]._id.sales_month - 1), 1)
//     var month = date.toLocaleDateString('default', { month: 'long' })

//     userCountByMonthLabels.push(month)
//     userCountByMonthDataResults.push(lineJSON[i].total)
// }

// console.log(userCountByMonthLabels)
// console.log(userCountByMonthDataResults)

// var firstChart = new Chart(line, {
//     type: 'line',
//     data: {
//         labels: userCountByMonthLabels,
//         datasets: [{
//             data: userCountByMonthDataResults,
//             backgroundColor: '#f8c291',
//             borderColor: '#e55039'
//         }]
//     },
//     options: {
//         scales: {
//             yAxes: [{
//                 ticks: {
//                     beginAtZero: true
//                 }
//             }]
//         },
//         legend: {
//             display: false,
//         }
//     }
// });