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

let apiurl = "https://data.covid19india.org/data.json";

async function getData() {
    let data = [];

    let response = await fetch(apiurl);
    data = await response.json();
    console.log(data);
    document.getElementById('totalC').innerHTML =
        data.cases_time_series[data.cases_time_series.length - 1].totalconfirmed;
    document.getElementById('totalR').innerHTML =
        data.cases_time_series[data.cases_time_series.length - 1].totalrecovered;
    document.getElementById('totalD').innerHTML =
        data.cases_time_series[data.cases_time_series.length - 1].totaldeceased;
    let Xdates = [];
    let Ynumbers = [];
    let RecoveredCases = [];
    let DeceasedCases = [];
    let len = data.cases_time_series.length;
    for (let i = 0; i < len; i++) {
        Xdates.push(data.cases_time_series[i].date);
        Ynumbers.push(data.cases_time_series[i].dailyconfirmed);
        RecoveredCases.push(data.cases_time_series[i].dailyrecovered);
        DeceasedCases.push(data.cases_time_series[i].dailydeceased);
    }
    return { Xdates, Ynumbers, RecoveredCases, DeceasedCases };
}
charttotalcases();
async function charttotalcases() {
    let ctx = document.getElementById('myChart').getContext('2d');
    Chart.defaults.font.size = 12;
    let data = await getData();
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.Xdates,
            datasets: [{
                label: 'Cases/Day',
                data: data.Ynumbers,
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
        taarik30.push(data.Xdates[data.Xdates.length - 30 + i]);
        number30.push(data.Ynumbers[data.Ynumbers.length - 30 + i]);
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
            labels: data.Xdates,
            datasets: [{
                label: 'Recovered Cases/Day',
                data: data.RecoveredCases,
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
        taarik30.push(data.Xdates[data.Xdates.length - 30 + i]);
        number30.push(data.RecoveredCases[data.RecoveredCases.length - 30 + i]);
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
            labels: data.Xdates,
            datasets: [{
                label: 'Deceased Cases/Day',
                data: data.DeceasedCases,
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
chartIt30totaldeceased();
async function chartIt30totaldeceased() {
    const ctx =
        document.getElementById('Last30Daysdeceased').getContext('2d');
    const data = await getData();
    let taarik30 = [];
    let number30 = [];
    for (var i = 0; i < 30; i++) {
        taarik30.push(data.Xdates[data.Xdates.length - 30 + i]);
        number30.push(data.DeceasedCases[data.DeceasedCases.length - 30 + i]);
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
