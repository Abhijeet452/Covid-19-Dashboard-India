let loader = document.getElementById("preloader");

window.addEventListener("load", function() {
    loader.style.display = "none";
})

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
}


const navLink = document.querySelectorAll(".nav-link");

navLink.forEach(n => n.addEventListener("click", closeMenu));

function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}

var apiURL = 'https://data.covid19india.org/v4/min/timeseries.min.json';
var data = [];
async function getData() {
    var response = await fetch(apiURL);
    data = await response.json();
    // console.log(data);
    const dates = Object.keys(data.TT.dates);
    // console.log(dates);
    let totalcases = [];
    let totalrecovered = [];
    let totaldeceased = [];
    let totaldates = [];
    let newcases = [];
    let newrecovered = [];
    let newdeceased = [];
    for (let i = 0; i < dates.length; i++) {
        totalcases.push(data.TT.dates[dates[i]].total.confirmed);
        totalrecovered.push(data.TT.dates[dates[i]].total.recovered);
        totaldeceased.push(data.TT.dates[dates[i]].total.deceased);
        totaldates.push(dates[i]);
    }
    for (let i = 1; i < dates.length; i++) {
        newcases.push(Math.abs(totalcases[i] - totalcases[i - 1]));
        newrecovered.push(Math.abs(totalrecovered[i] - totalrecovered[i - 1]));
        newdeceased.push(Math.abs(totaldeceased[i] - totaldeceased[i - 1]));
    }
    // console.log(newcases);
    document.getElementById('totalC').innerHTML = data.TT.dates[dates[dates.length - 1]].total.confirmed;
    document.getElementById('totalR').innerHTML = data.TT.dates[dates[dates.length - 1]].total.recovered;
    document.getElementById('totalD').innerHTML = data.TT.dates[dates[dates.length - 1]].total.deceased;
    // console.log(totalcases);
    // console.log(totalrecovered);
    // console.log(totaldeceased);
    // console.log(totaldates);
    return { totalcases, totalrecovered, totaldeceased, totaldates, newcases, newrecovered, newdeceased }
}
// getData();
// statewise();
// async function statewise() {
//     let dat = await getData();
//     // let statelen = dat.states.length;
//     for (let i = 0; i < 36; i++) {
//         document.getElementById('state' + (i + 1)).innerHTML += dat.states[i];
//         document.getElementById('confirmed' + (i + 1)).innerHTML += dat.statesconfirmed[i];
//         document.getElementById('death' + (i + 1)).innerHTML += dat.statesdeath[i];
//         document.getElementById('recovered' + (i + 1)).innerHTML += dat.statesrecovered[i];
//         console.log('state' + (i + 1));
//     }

// }
charttotalcases();
async function charttotalcases() {
    let ctx = document.getElementById('myChart').getContext('2d');
    Chart.defaults.font.size = 12;
    let data = await getData();
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.totaldates,
            datasets: [{
                label: 'Cases/Day',
                data: data.newcases,
                backgroundColor: 'orange',
                borderColor: 'orange',
                borderWidth: 3
            }]
        },
        options: {
            responsive: false,
            maintainAspectRatio: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            layout: {
                padding: {
                    left: 40,
                    right: 40,
                    bottom: 20,
                    top: 20
                }
            }
        }
    });
}

chartIt30total();
async function chartIt30total() {
    const ctx =
        document.getElementById('Last30Days').getContext('2d');
    const data = await getData();
    let taarik30 = [];
    let number30 = [];
    for (var i = 0; i < 30; i++) {
        taarik30.push(data.totaldates[data.totaldates.length - 30 + i]);
        number30.push(data.newcases[data.newcases.length - 30 + i]);
    }
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: taarik30,
            datasets: [{
                label: 'Cases/Day Of Last 30 Days',
                data: number30,
                backgroundColor: 'orange',
                borderColor: 'orange',
                borderWidth: 1
            }]
        },
        options: {
            maintainAspectRatio: true,
            responsive: false,
            scales: {
                y: {
                    beginAtZero: false
                }
            },
            layout: {
                padding: {
                    left: 40,
                    right: 40,
                    bottom: 20,
                    top: 20
                }
            }
        }
    });
}
charttotalcasesrecoved();
async function charttotalcasesrecoved() {
    var ctx = document.getElementById('myChartrecovered').getContext('2d');
    Chart.defaults.font.size = 12;
    let data = await getData();
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.totaldates,
            datasets: [{
                label: 'Recovered Cases/Day',
                data: data.newrecovered,
                backgroundColor: 'green',
                borderColor: 'green',
                borderWidth: 3
            }]
        },
        options: {
            responsive: false,
            maintainAspectRatio: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            layout: {
                padding: {
                    left: 40,
                    right: 40,
                    bottom: 20,
                    top: 20
                }
            }
        }
    });
}
chartIt30totalrecovered();
async function chartIt30totalrecovered() {
    const ctx =
        document.getElementById('Last30Daysrecovored').getContext('2d');
    const data = await getData();
    let taarik30 = [];
    let number30 = [];
    for (var i = 0; i < 30; i++) {
        taarik30.push(data.totaldates[data.totaldates.length - 30 + i]);
        number30.push(data.newrecovered[data.newrecovered.length - 30 + i]);
    }
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: taarik30,
            datasets: [{
                label: 'Recovered Cases/Day Of Last 30 Days',
                data: number30,
                backgroundColor: 'green',
                borderColor: 'green',
                borderWidth: 1
            }]
        },
        options: {
            maintainAspectRatio: true,
            responsive: false,
            scales: {
                y: {
                    beginAtZero: false
                }
            },
            layout: {
                padding: {
                    left: 40,
                    right: 40,
                    bottom: 20,
                    top: 20
                }
            }
        }
    });
}
charttotalcasesdeceased();
async function charttotalcasesdeceased() {
    var ctx = document.getElementById('myChartdeceased').getContext('2d');
    Chart.defaults.font.size = 12;
    let data = await getData();
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.totaldates,
            datasets: [{
                label: 'Deceased Cases/Day',
                data: data.newdeceased,
                backgroundColor: 'red',
                borderColor: 'red',
                borderWidth: 3
            }]
        },
        options: {
            responsive: false,
            maintainAspectRatio: true,
            scales: {
                y: {
                    beginAtZero: true,
                }
            },
            layout: {
                padding: {
                    left: 40,
                    right: 40,
                    bottom: 20,
                    top: 20
                }
            }
        }
    });
}
chartIt30totaldeceased();
async function chartIt30totaldeceased() {
    const ctx =
        document.getElementById('Last30Daysdeceased').getContext('2d');
    const data = await getData();
    let taarik30 = [];
    let number30 = [];
    for (var i = 0; i < 30; i++) {
        taarik30.push(data.totaldates[data.totaldates.length - 30 + i]);
        number30.push(data.newdeceased[data.newdeceased.length - 30 + i]);
    }
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: taarik30,
            datasets: [{
                label: 'Deceased Cases/Day Of Last 30 Days',
                data: number30,
                backgroundColor: 'red',
                borderColor: 'red',
                borderWidth: 1
            }]
        },
        options: {
            responsive: false,
            maintainAspectRatio: true,
            scales: {
                y: {
                    beginAtZero: false
                }
            },
            layout: {
                padding: {
                    left: 40,
                    right: 40,
                    bottom: 20,
                    top: 20
                }
            }
        }
    });
}
window.onload = function graph30display() {
    document.getElementById('Last30Days').style.display = 'none';
    document.getElementById('Last30Daysrecovored').style.display = 'none';
    document.getElementById('Last30Daysdeceased').style.display = 'none';
}

function changetotalgraph() {
    document.getElementById('myChart').style.display = "block";
    document.getElementById('Last30Days').style.display = "none";
}

function changetotalgraphrecovered() {
    document.getElementById('myChartrecovered').style.display = "block";
    document.getElementById('Last30Daysrecovored').style.display = "none";
}

function changetotalgraphdeceased() {
    document.getElementById('myChartdeceased').style.display = "block";
    document.getElementById('Last30Daysdeceased').style.display = "none";
}


function change30graph() {
    document.getElementById('myChart').style.display = "none";
    document.getElementById('Last30Days').style.display = "block";

}

function change30graphrecovered() {
    document.getElementById('myChartrecovered').style.display = "none";
    document.getElementById('Last30Daysrecovored').style.display = "block";
}

function change30graphdeceased() {
    document.getElementById('myChartdeceased').style.display = "none";
    document.getElementById('Last30Daysdeceased').style.display = "block";
}
