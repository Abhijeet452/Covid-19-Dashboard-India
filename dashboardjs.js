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

let api = "https://data.covid19india.org/data.json";
async function getD() {
    let dat = [];
    let response = await fetch(api);
    dat = await response.json();
    console.log(dat);
    let states = [];
    let statewiselength = dat.statewise.length;
    for (let i = 1; i < statewiselength; i++) {
        states.push(dat.statewise[i].state);
    }
    states.splice(30, 1);
    // console.log(states);
    return { states };
}
statewise();
async function statewise() {
    let dat = await getD();
    for (let i = 0; i < 36; i++) {
        document.getElementById('state' + (i + 1)).innerHTML = dat.states[i];
        console.log('state' + (i + 1));
    }
}

var apiURL = 'https://data.covid19india.org/v4/min/timeseries.min.json';
var data = [];
async function getData() {
    var response = await fetch(apiURL);
    data = await response.json();
    console.log(data);
    const dates = Object.keys(data.TT.dates);
    const allstates = Object.keys(data);
    allstates.splice(33, 2);
    console.log(allstates);
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
    document.getElementById('totalC').innerHTML = data.TT.dates[dates[dates.length - 1]].total.confirmed;
    document.getElementById('+').innerHTML =
        (data.TT.dates[dates[dates.length - 1]].total.confirmed) -
        (data.TT.dates[dates[dates.length - 2]].total.confirmed);
    document.getElementById('totalR').innerHTML = data.TT.dates[dates[dates.length - 1]].total.recovered;
    document.getElementById('totalD').innerHTML = data.TT.dates[dates[dates.length - 1]].total.deceased;

    return { totalcases, totalrecovered, totaldeceased, totaldates, newcases, newrecovered, newdeceased, dates, allstates }
}


Practice();
async function Practice() {
    let response = await fetch(apiURL);
    let data = [];
    data = await response.json();
    const dates = Object.keys(data.TT.dates);
    console.log(dates);
    let VData1 = [];
    let VData2 = [];
    let date100 = [];
    for (let i = 0; i < 101; i++) {
        VData1.push(data.TT.dates[dates[dates.length - 1 - (100 - i)]].total.vaccinated1);
        VData2.push(data.TT.dates[dates[dates.length - 1 - (100 - i)]].total.vaccinated2);
        date100.push(dates[dates.length - 1 - (100 - i)]);
    }
    let realv1 = [];
    let realv2 = [];
    for (let i = 1; i < 100; i++) {
        realv1[i] = Math.abs(VData1[i] - VData1[i - 1]);
        realv2[i] = Math.abs(VData2[i] - VData2[i - 1]);
    }
    realv1.splice(0, 1);
    realv2.splice(0, 1);
    date100.splice(0, 1);
    console.log(realv1, realv2, date100);
    let ctx = document.getElementById('TotalVaccinated').getContext('2d');
    Chart.defaults.font.size = 12;
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: date100,
            datasets: [{
                label: '1st Dose/Day',
                data: realv1,
                backgroundColor: 'green',
                borderColor: 'green',
                borderWidth: 3
            },{
                label: '2nd Dose/Day',
                data: realv2,
                backgroundColor: 'blue',
                borderColor: 'blue',
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
                    bottom: 10,
                    top: 10
                }
            }
        }
    });

}

allstatedata();
async function allstatedata() {
    let response = await fetch(apiURL);
    let data = [];
    data = await response.json();
    const dates = Object.keys(data.DN.dates);
    let ANtc1 = data.AN.dates[dates[dates.length - 1]].total.confirmed;
    let ANtc2 = data.AN.dates[dates[dates.length - 2]].total.confirmed;
    let ANtr1 = data.AN.dates[dates[dates.length - 1]].total.recovered;
    let ANtr2 = data.AN.dates[dates[dates.length - 2]].total.recovered;
    let ANtd1 = data.AN.dates[dates[dates.length - 1]].total.deceased;
    let ANtd2 = data.AN.dates[dates[dates.length - 2]].total.deceased;
    document.getElementById('confirmed1').innerHTML = "Confirmed: " + ANtc1 + " + " + (ANtc1 - ANtc2);
    document.getElementById('death1').innerHTML = "Death: " + ANtd1 + " + " + (ANtd1 - ANtd2);
    document.getElementById('recovered1').innerHTML = "Recovered: " + ANtr1 + " + " + (ANtr1 - ANtr2);
    let APtc1 = data.AP.dates[dates[dates.length - 1]].total.confirmed;
    let APtc2 = data.AP.dates[dates[dates.length - 2]].total.confirmed;
    let APtr1 = data.AP.dates[dates[dates.length - 1]].total.recovered;
    let APtr2 = data.AP.dates[dates[dates.length - 2]].total.recovered;
    let APtd1 = data.AP.dates[dates[dates.length - 1]].total.deceased;
    let APtd2 = data.AP.dates[dates[dates.length - 2]].total.deceased;
    document.getElementById('confirmed2').innerHTML = "Confirmed: " + APtc1 + " + " + (APtc1 - APtc2);
    document.getElementById('death2').innerHTML = "Death: " + APtd1 + " + " + (APtd1 - APtd2);
    document.getElementById('recovered2').innerHTML = "Recovered: " + APtr1 + " + " + (APtr1 - APtr2);
    let ARtc1 = data.AR.dates[dates[dates.length - 1]].total.confirmed;
    let ARtc2 = data.AR.dates[dates[dates.length - 2]].total.confirmed;
    let ARtr1 = data.AR.dates[dates[dates.length - 1]].total.recovered;
    let ARtr2 = data.AR.dates[dates[dates.length - 2]].total.recovered;
    let ARtd1 = data.AR.dates[dates[dates.length - 1]].total.deceased;
    let ARtd2 = data.AR.dates[dates[dates.length - 2]].total.deceased;
    document.getElementById('confirmed3').innerHTML = "Confirmed: " + ARtc1 + " + " + (ARtc1 - ARtc2);
    document.getElementById('death3').innerHTML = "Death: " + ARtd1 + " + " + (ARtd1 - ARtd2);
    document.getElementById('recovered3').innerHTML = "Recovered: " + ARtr1 + " + " + (ARtr1 - ARtr2);
    let AStc1 = data.AS.dates[dates[dates.length - 1]].total.confirmed;
    let AStc2 = data.AS.dates[dates[dates.length - 2]].total.confirmed;
    let AStr1 = data.AS.dates[dates[dates.length - 1]].total.recovered;
    let AStr2 = data.AS.dates[dates[dates.length - 2]].total.recovered;
    let AStd1 = data.AS.dates[dates[dates.length - 1]].total.deceased;
    let AStd2 = data.AS.dates[dates[dates.length - 2]].total.deceased;
    document.getElementById('confirmed4').innerHTML = "Confirmed: " + AStc1 + " + " + (AStc1 - AStc2);
    document.getElementById('death4').innerHTML = "Death: " + AStd1 + " + " + (AStd1 - AStd2);
    document.getElementById('recovered4').innerHTML = "Recovered: " + AStr1 + " + " + (AStr1 - AStr2);
    let BRtc1 = data.BR.dates[dates[dates.length - 1]].total.confirmed;
    let BRtc2 = data.BR.dates[dates[dates.length - 2]].total.confirmed;
    let BRtr1 = data.BR.dates[dates[dates.length - 1]].total.recovered;
    let BRtr2 = data.BR.dates[dates[dates.length - 2]].total.recovered;
    let BRtd1 = data.BR.dates[dates[dates.length - 1]].total.deceased;
    let BRtd2 = data.BR.dates[dates[dates.length - 2]].total.deceased;
    document.getElementById('confirmed5').innerHTML = "Confirmed: " + BRtc1 + " + " + (BRtc1 - BRtc2);
    document.getElementById('death5').innerHTML = "Death: " + BRtd1 + " + " + (BRtd1 - BRtd2);
    document.getElementById('recovered5').innerHTML = "Recovered: " + BRtr1 + " + " + (BRtr1 - BRtr2);
    let CHtc1 = data.CH.dates[dates[dates.length - 1]].total.confirmed;
    let CHtc2 = data.CH.dates[dates[dates.length - 2]].total.confirmed;
    let CHtr1 = data.CH.dates[dates[dates.length - 1]].total.recovered;
    let CHtr2 = data.CH.dates[dates[dates.length - 2]].total.recovered;
    let CHtd1 = data.CH.dates[dates[dates.length - 1]].total.deceased;
    let CHtd2 = data.CH.dates[dates[dates.length - 2]].total.deceased;
    document.getElementById('confirmed6').innerHTML = "Confirmed: " + CHtc1 + " + " + (CHtc1 - CHtc2);
    document.getElementById('death6').innerHTML = "Death: " + CHtd1 + " + " + (CHtd1 - CHtd2);
    document.getElementById('recovered6').innerHTML = "Recovered: " + CHtr1 + " + " + (CHtr1 - CHtr2);
    let CTtc1 = data.CT.dates[dates[dates.length - 1]].total.confirmed;
    let CTtc2 = data.CT.dates[dates[dates.length - 2]].total.confirmed;
    let CTtr1 = data.CT.dates[dates[dates.length - 1]].total.recovered;
    let CTtr2 = data.CT.dates[dates[dates.length - 2]].total.recovered;
    let CTtd1 = data.CT.dates[dates[dates.length - 1]].total.deceased;
    let CTtd2 = data.CT.dates[dates[dates.length - 2]].total.deceased;
    document.getElementById('confirmed7').innerHTML = "Confirmed: " + CTtc1 + " + " + (CTtc1 - CTtc2);
    document.getElementById('death7').innerHTML = "Death: " + CTtd1 + " + " + (CTtd1 - CTtd2);
    document.getElementById('recovered7').innerHTML = "Recovered: " + CTtr1 + " + " + (CTtr1 - CTtr2);
    let DNtc1 = data.DN.dates[dates[dates.length - 1]].total.confirmed;
    let DNtc2 = data.DN.dates[dates[dates.length - 2]].total.confirmed;
    let DNtr1 = data.DN.dates[dates[dates.length - 1]].total.recovered;
    let DNtr2 = data.DN.dates[dates[dates.length - 2]].total.recovered;
    let DNtd1 = data.DN.dates[dates[dates.length - 1]].total.deceased;
    let DNtd2 = data.DN.dates[dates[dates.length - 2]].total.deceased;
    document.getElementById('confirmed8').innerHTML = "Confirmed: " + DNtc1 + " + " + (DNtc1 - DNtc2);
    document.getElementById('death8').innerHTML = "Death: " + DNtd1 + " + " + (DNtd1 - DNtd2);
    document.getElementById('recovered8').innerHTML = "Recovered: " + DNtr1 + " + " + (DNtr1 - DNtr2);
    let DLtc1 = data.DL.dates[dates[dates.length - 1]].total.confirmed;
    let DLtc2 = data.DL.dates[dates[dates.length - 2]].total.confirmed;
    let DLtr1 = data.DL.dates[dates[dates.length - 1]].total.recovered;
    let DLtr2 = data.DL.dates[dates[dates.length - 2]].total.recovered;
    let DLtd1 = data.DL.dates[dates[dates.length - 1]].total.deceased;
    let DLtd2 = data.DL.dates[dates[dates.length - 2]].total.deceased;
    document.getElementById('confirmed9').innerHTML = "Confirmed: " + DLtc1 + " + " + (DLtc1 - DLtc2);
    document.getElementById('death9').innerHTML = "Death: " + DLtd1 + " + " + (DLtd1 - DLtd2);
    document.getElementById('recovered9').innerHTML = "Recovered: " + DLtr1 + " + " + (DLtr1 - DLtr2);
    let GAtc1 = data.GA.dates[dates[dates.length - 1]].total.confirmed;
    let GAtc2 = data.GA.dates[dates[dates.length - 2]].total.confirmed;
    let GAtr1 = data.GA.dates[dates[dates.length - 1]].total.recovered;
    let GAtr2 = data.GA.dates[dates[dates.length - 2]].total.recovered;
    let GAtd1 = data.GA.dates[dates[dates.length - 1]].total.deceased;
    let GAtd2 = data.GA.dates[dates[dates.length - 2]].total.deceased;
    document.getElementById('confirmed10').innerHTML = "Confirmed: " + GAtc1 + " + " + (GAtc1 - GAtc2);
    document.getElementById('death10').innerHTML = "Death: " + GAtd1 + " + " + (GAtd1 - GAtd2);
    document.getElementById('recovered10').innerHTML = "Recovered: " + GAtr1 + " + " + (GAtr1 - GAtr2);
    let GJtc1 = data.GJ.dates[dates[dates.length - 1]].total.confirmed;
    let GJtc2 = data.GJ.dates[dates[dates.length - 2]].total.confirmed;
    let GJtr1 = data.GJ.dates[dates[dates.length - 1]].total.recovered;
    let GJtr2 = data.GJ.dates[dates[dates.length - 2]].total.recovered;
    let GJtd1 = data.GJ.dates[dates[dates.length - 1]].total.deceased;
    let GJtd2 = data.GJ.dates[dates[dates.length - 2]].total.deceased;
    document.getElementById('confirmed11').innerHTML = "Confirmed: " + GJtc1 + " + " + (GJtc1 - GJtc2);
    document.getElementById('death11').innerHTML = "Death: " + GJtd1 + " + " + (GJtd1 - GJtd2);
    document.getElementById('recovered11').innerHTML = "Recovered: " + GJtr1 + " + " + (GJtr1 - GJtr2);
    let HRtc1 = data.HR.dates[dates[dates.length - 1]].total.confirmed;
    let HRtc2 = data.HR.dates[dates[dates.length - 2]].total.confirmed;
    let HRtr1 = data.HR.dates[dates[dates.length - 1]].total.recovered;
    let HRtr2 = data.HR.dates[dates[dates.length - 2]].total.recovered;
    let HRtd1 = data.HR.dates[dates[dates.length - 1]].total.deceased;
    let HRtd2 = data.HR.dates[dates[dates.length - 2]].total.deceased;
    document.getElementById('confirmed12').innerHTML = "Confirmed: " + HRtc1 + " + " + (HRtc1 - HRtc2);
    document.getElementById('death12').innerHTML = "Death: " + HRtd1 + " + " + (HRtd1 - HRtd2);
    document.getElementById('recovered12').innerHTML = "Recovered: " + HRtr1 + " + " + (HRtr1 - HRtr2);
    let HPtc1 = data.HP.dates[dates[dates.length - 1]].total.confirmed;
    let HPtc2 = data.HP.dates[dates[dates.length - 2]].total.confirmed;
    let HPtr1 = data.HP.dates[dates[dates.length - 1]].total.recovered;
    let HPtr2 = data.HP.dates[dates[dates.length - 2]].total.recovered;
    let HPtd1 = data.HP.dates[dates[dates.length - 1]].total.deceased;
    let HPtd2 = data.HP.dates[dates[dates.length - 2]].total.deceased;
    document.getElementById('confirmed13').innerHTML = "Confirmed: " + HPtc1 + " + " + (HPtc1 - HPtc2);
    document.getElementById('death13').innerHTML = "Death: " + HPtd1 + " + " + (HPtd1 - HPtd2);
    document.getElementById('recovered13').innerHTML = "Recovered: " + HPtr1 + " + " + (HPtr1 - HPtr2);
    let JKtc1 = data.JK.dates[dates[dates.length - 1]].total.confirmed;
    let JKtc2 = data.JK.dates[dates[dates.length - 2]].total.confirmed;
    let JKtr1 = data.JK.dates[dates[dates.length - 1]].total.recovered;
    let JKtr2 = data.JK.dates[dates[dates.length - 2]].total.recovered;
    let JKtd1 = data.JK.dates[dates[dates.length - 1]].total.deceased;
    let JKtd2 = data.JK.dates[dates[dates.length - 2]].total.deceased;
    document.getElementById('confirmed14').innerHTML = "Confirmed: " + JKtc1 + " + " + (JKtc1 - JKtc2);
    document.getElementById('death14').innerHTML = "Death: " + JKtd1 + " + " + (JKtd1 - JKtd2);
    document.getElementById('recovered14').innerHTML = "Recovered: " + JKtr1 + " + " + (JKtr1 - JKtr2);
    let JHtc1 = data.JH.dates[dates[dates.length - 1]].total.confirmed;
    let JHtc2 = data.JH.dates[dates[dates.length - 2]].total.confirmed;
    let JHtr1 = data.JH.dates[dates[dates.length - 1]].total.recovered;
    let JHtr2 = data.JH.dates[dates[dates.length - 2]].total.recovered;
    let JHtd1 = data.JH.dates[dates[dates.length - 1]].total.deceased;
    let JHtd2 = data.JH.dates[dates[dates.length - 2]].total.deceased;
    document.getElementById('confirmed15').innerHTML = "Confirmed: " + JHtc1 + " + " + (JHtc1 - JHtc2);
    document.getElementById('death15').innerHTML = "Death: " + JHtd1 + " + " + (JHtd1 - JHtd2);
    document.getElementById('recovered15').innerHTML = "Recovered: " + JHtr1 + " + " + (JHtr1 - JHtr2);
    let KAtc1 = data.KA.dates[dates[dates.length - 1]].total.confirmed;
    let KAtc2 = data.KA.dates[dates[dates.length - 2]].total.confirmed;
    let KAtr1 = data.KA.dates[dates[dates.length - 1]].total.recovered;
    let KAtr2 = data.KA.dates[dates[dates.length - 2]].total.recovered;
    let KAtd1 = data.KA.dates[dates[dates.length - 1]].total.deceased;
    let KAtd2 = data.KA.dates[dates[dates.length - 2]].total.deceased;
    document.getElementById('confirmed16').innerHTML = "Confirmed: " + KAtc1 + " + " + (KAtc1 - KAtc2);
    document.getElementById('death16').innerHTML = "Death: " + KAtd1 + " + " + (KAtd1 - KAtd2);
    document.getElementById('recovered16').innerHTML = "Recovered: " + KAtr1 + " + " + (KAtr1 - KAtr2);
    let KLtc1 = data.KL.dates[dates[dates.length - 1]].total.confirmed;
    let KLtc2 = data.KL.dates[dates[dates.length - 2]].total.confirmed;
    let KLtr1 = data.KL.dates[dates[dates.length - 1]].total.recovered;
    let KLtr2 = data.KL.dates[dates[dates.length - 2]].total.recovered;
    let KLtd1 = data.KL.dates[dates[dates.length - 1]].total.deceased;
    let KLtd2 = data.KL.dates[dates[dates.length - 2]].total.deceased;
    document.getElementById('confirmed17').innerHTML = "Confirmed: " + KLtc1 + " + " + (KLtc1 - KLtc2);
    document.getElementById('death17').innerHTML = "Death: " + KLtd1 + " + " + (KLtd1 - KLtd2);
    document.getElementById('recovered17').innerHTML = "Recovered: " + KLtr1 + " + " + (KLtr1 - KLtr2);
    let LAtc1 = data.LA.dates[dates[dates.length - 1]].total.confirmed;
    let LAtc2 = data.LA.dates[dates[dates.length - 2]].total.confirmed;
    let LAtr1 = data.LA.dates[dates[dates.length - 1]].total.recovered;
    let LAtr2 = data.LA.dates[dates[dates.length - 2]].total.recovered;
    let LAtd1 = data.LA.dates[dates[dates.length - 1]].total.deceased;
    let LAtd2 = data.LA.dates[dates[dates.length - 2]].total.deceased;
    document.getElementById('confirmed18').innerHTML = "Confirmed: " + LAtc1 + " + " + (LAtc1 - LAtc2);
    document.getElementById('death18').innerHTML = "Death: " + LAtd1 + " + " + (LAtd1 - LAtd2);
    document.getElementById('recovered18').innerHTML = "Recovered: " + LAtr1 + " + " + (LAtr1 - LAtr2);
    let LDtc1 = data.LD.dates[dates[dates.length - 1]].total.confirmed;
    let LDtc2 = data.LD.dates[dates[dates.length - 2]].total.confirmed;
    let LDtr1 = data.LD.dates[dates[dates.length - 1]].total.recovered;
    let LDtr2 = data.LD.dates[dates[dates.length - 2]].total.recovered;
    let LDtd1 = data.LD.dates[dates[dates.length - 1]].total.deceased;
    let LDtd2 = data.LD.dates[dates[dates.length - 2]].total.deceased;
    document.getElementById('confirmed19').innerHTML = "Confirmed: " + LDtc1 + " + " + (LDtc1 - LDtc2);
    document.getElementById('death19').innerHTML = "Death: " + LDtd1 + " + " + (LDtd1 - LDtd2);
    document.getElementById('recovered19').innerHTML = "Recovered: " + LDtr1 + " + " + (LDtr1 - LDtr2);
    let MPtc1 = data.MP.dates[dates[dates.length - 1]].total.confirmed;
    let MPtc2 = data.MP.dates[dates[dates.length - 2]].total.confirmed;
    let MPtr1 = data.MP.dates[dates[dates.length - 1]].total.recovered;
    let MPtr2 = data.MP.dates[dates[dates.length - 2]].total.recovered;
    let MPtd1 = data.MP.dates[dates[dates.length - 1]].total.deceased;
    let MPtd2 = data.MP.dates[dates[dates.length - 2]].total.deceased;
    document.getElementById('confirmed20').innerHTML = "Confirmed: " + MPtc1 + " + " + (MPtc1 - MPtc2);
    document.getElementById('death20').innerHTML = "Death: " + MPtd1 + " + " + (MPtd1 - MPtd2);
    document.getElementById('recovered20').innerHTML = "Recovered: " + MPtr1 + " + " + (MPtr1 - MPtr2);
    let MHtc1 = data.MH.dates[dates[dates.length - 1]].total.confirmed;
    let MHtc2 = data.MH.dates[dates[dates.length - 2]].total.confirmed;
    let MHtr1 = data.MH.dates[dates[dates.length - 1]].total.recovered;
    let MHtr2 = data.MH.dates[dates[dates.length - 2]].total.recovered;
    let MHtd1 = data.MH.dates[dates[dates.length - 1]].total.deceased;
    let MHtd2 = data.MH.dates[dates[dates.length - 2]].total.deceased;
    document.getElementById('confirmed21').innerHTML = "Confirmed: " + MHtc1 + " + " + (MHtc1 - MHtc2);
    document.getElementById('death21').innerHTML = "Death: " + MHtd1 + " + " + (MHtd1 - MHtd2);
    document.getElementById('recovered21').innerHTML = "Recovered: " + MHtr1 + " + " + (MHtr1 - MHtr2);
    let MNtc1 = data.MN.dates[dates[dates.length - 1]].total.confirmed;
    let MNtc2 = data.MN.dates[dates[dates.length - 2]].total.confirmed;
    let MNtr1 = data.MN.dates[dates[dates.length - 1]].total.recovered;
    let MNtr2 = data.MN.dates[dates[dates.length - 2]].total.recovered;
    let MNtd1 = data.MN.dates[dates[dates.length - 1]].total.deceased;
    let MNtd2 = data.MN.dates[dates[dates.length - 2]].total.deceased;
    document.getElementById('confirmed22').innerHTML = "Confirmed: " + MNtc1 + " + " + (MNtc1 - MNtc2);
    document.getElementById('death22').innerHTML = "Death: " + MNtd1 + " + " + (MNtd1 - MNtd2);
    document.getElementById('recovered22').innerHTML = "Recovered: " + MNtr1 + " + " + (MNtr1 - MNtr2);
    let MLtc1 = data.ML.dates[dates[dates.length - 1]].total.confirmed;
    let MLtc2 = data.ML.dates[dates[dates.length - 2]].total.confirmed;
    let MLtr1 = data.ML.dates[dates[dates.length - 1]].total.recovered;
    let MLtr2 = data.ML.dates[dates[dates.length - 2]].total.recovered;
    let MLtd1 = data.ML.dates[dates[dates.length - 1]].total.deceased;
    let MLtd2 = data.ML.dates[dates[dates.length - 2]].total.deceased;
    document.getElementById('confirmed23').innerHTML = "Confirmed: " + MLtc1 + " + " + (MLtc1 - MLtc2);
    document.getElementById('death23').innerHTML = "Death: " + MLtd1 + " + " + (MLtd1 - MLtd2);
    document.getElementById('recovered23').innerHTML = "Recovered: " + MLtr1 + " + " + (MLtr1 - MLtr2);
    let MZtc1 = data.MZ.dates[dates[dates.length - 1]].total.confirmed;
    let MZtc2 = data.MZ.dates[dates[dates.length - 2]].total.confirmed;
    let MZtr1 = data.MZ.dates[dates[dates.length - 1]].total.recovered;
    let MZtr2 = data.MZ.dates[dates[dates.length - 2]].total.recovered;
    let MZtd1 = data.MZ.dates[dates[dates.length - 1]].total.deceased;
    let MZtd2 = data.MZ.dates[dates[dates.length - 2]].total.deceased;
    document.getElementById('confirmed24').innerHTML = "Confirmed: " + MZtc1 + " + " + (MZtc1 - MZtc2);
    document.getElementById('death24').innerHTML = "Death: " + MZtd1 + " + " + (MZtd1 - MZtd2);
    document.getElementById('recovered24').innerHTML = "Recovered: " + MZtr1 + " + " + (MZtr1 - MZtr2);
    let NLtc1 = data.NL.dates[dates[dates.length - 1]].total.confirmed;
    let NLtc2 = data.NL.dates[dates[dates.length - 2]].total.confirmed;
    let NLtr1 = data.NL.dates[dates[dates.length - 1]].total.recovered;
    let NLtr2 = data.NL.dates[dates[dates.length - 2]].total.recovered;
    let NLtd1 = data.NL.dates[dates[dates.length - 1]].total.deceased;
    let NLtd2 = data.NL.dates[dates[dates.length - 2]].total.deceased;
    document.getElementById('confirmed25').innerHTML = "Confirmed: " + NLtc1 + " + " + (NLtc1 - NLtc2);
    document.getElementById('death25').innerHTML = "Death: " + NLtd1 + " + " + (NLtd1 - NLtd2);
    document.getElementById('recovered25').innerHTML = "Recovered: " + NLtr1 + " + " + (NLtr1 - NLtr2);
    let ORtc1 = data.OR.dates[dates[dates.length - 1]].total.confirmed;
    let ORtc2 = data.OR.dates[dates[dates.length - 2]].total.confirmed;
    let ORtr1 = data.OR.dates[dates[dates.length - 1]].total.recovered;
    let ORtr2 = data.OR.dates[dates[dates.length - 2]].total.recovered;
    let ORtd1 = data.OR.dates[dates[dates.length - 1]].total.deceased;
    let ORtd2 = data.OR.dates[dates[dates.length - 2]].total.deceased;
    document.getElementById('confirmed26').innerHTML = "Confirmed: " + ORtc1 + " + " + (ORtc1 - ORtc2);
    document.getElementById('death26').innerHTML = "Death: " + ORtd1 + " + " + (ORtd1 - ORtd2);
    document.getElementById('recovered26').innerHTML = "Recovered: " + ORtr1 + " + " + (ORtr1 - ORtr2);
    let PYtc1 = data.PY.dates[dates[dates.length - 1]].total.confirmed;
    let PYtc2 = data.PY.dates[dates[dates.length - 2]].total.confirmed;
    let PYtr1 = data.PY.dates[dates[dates.length - 1]].total.recovered;
    let PYtr2 = data.PY.dates[dates[dates.length - 2]].total.recovered;
    let PYtd1 = data.PY.dates[dates[dates.length - 1]].total.deceased;
    let PYtd2 = data.PY.dates[dates[dates.length - 2]].total.deceased;
    document.getElementById('confirmed27').innerHTML = "Confirmed: " + PYtc1 + " + " + (PYtc1 - PYtc2);
    document.getElementById('death27').innerHTML = "Death: " + PYtd1 + " + " + (PYtd1 - PYtd2);
    document.getElementById('recovered27').innerHTML = "Recovered: " + PYtr1 + " + " + (PYtr1 - PYtr2);
    let PBtc1 = data.PB.dates[dates[dates.length - 1]].total.confirmed;
    let PBtc2 = data.PB.dates[dates[dates.length - 2]].total.confirmed;
    let PBtr1 = data.PB.dates[dates[dates.length - 1]].total.recovered;
    let PBtr2 = data.PB.dates[dates[dates.length - 2]].total.recovered;
    let PBtd1 = data.PB.dates[dates[dates.length - 1]].total.deceased;
    let PBtd2 = data.PB.dates[dates[dates.length - 2]].total.deceased;
    document.getElementById('confirmed28').innerHTML = "Confirmed: " + PBtc1 + " + " + (PBtc1 - PBtc2);
    document.getElementById('death28').innerHTML = "Death: " + PBtd1 + " + " + (PBtd1 - PBtd2);
    document.getElementById('recovered28').innerHTML = "Recovered: " + PBtr1 + " + " + (PBtr1 - PBtr2);
    let RJtc1 = data.RJ.dates[dates[dates.length - 1]].total.confirmed;
    let RJtc2 = data.RJ.dates[dates[dates.length - 2]].total.confirmed;
    let RJtr1 = data.RJ.dates[dates[dates.length - 1]].total.recovered;
    let RJtr2 = data.RJ.dates[dates[dates.length - 2]].total.recovered;
    let RJtd1 = data.RJ.dates[dates[dates.length - 1]].total.deceased;
    let RJtd2 = data.RJ.dates[dates[dates.length - 2]].total.deceased;
    document.getElementById('confirmed29').innerHTML = "Confirmed: " + RJtc1 + " + " + (RJtc1 - RJtc2);
    document.getElementById('death29').innerHTML = "Death: " + RJtd1 + " + " + (RJtd1 - RJtd2);
    document.getElementById('recovered29').innerHTML = "Recovered: " + RJtr1 + " + " + (RJtr1 - RJtr2);
    let SKtc1 = data.SK.dates[dates[dates.length - 1]].total.confirmed;
    let SKtc2 = data.SK.dates[dates[dates.length - 2]].total.confirmed;
    let SKtr1 = data.SK.dates[dates[dates.length - 1]].total.recovered;
    let SKtr2 = data.SK.dates[dates[dates.length - 2]].total.recovered;
    let SKtd1 = data.SK.dates[dates[dates.length - 1]].total.deceased;
    let SKtd2 = data.SK.dates[dates[dates.length - 2]].total.deceased;
    document.getElementById('confirmed30').innerHTML = "Confirmed: " + SKtc1 + " + " + (SKtc1 - SKtc2);
    document.getElementById('death30').innerHTML = "Death: " + SKtd1 + " + " + (SKtd1 - SKtd2);
    document.getElementById('recovered30').innerHTML = "Recovered: " + SKtr1 + " + " + (SKtr1 - SKtr2);
    let TNtc1 = data.TN.dates[dates[dates.length - 1]].total.confirmed;
    let TNtc2 = data.TN.dates[dates[dates.length - 2]].total.confirmed;
    let TNtr1 = data.TN.dates[dates[dates.length - 1]].total.recovered;
    let TNtr2 = data.TN.dates[dates[dates.length - 2]].total.recovered;
    let TNtd1 = data.TN.dates[dates[dates.length - 1]].total.deceased;
    let TNtd2 = data.TN.dates[dates[dates.length - 2]].total.deceased;
    document.getElementById('confirmed31').innerHTML = "Confirmed: " + TNtc1 + " + " + (TNtc1 - TNtc2);
    document.getElementById('death31').innerHTML = "Death: " + TNtd1 + " + " + (TNtd1 - TNtd2);
    document.getElementById('recovered31').innerHTML = "Recovered: " + TNtr1 + " + " + (TNtr1 - TNtr2);
    let TGtc1 = data.TG.dates[dates[dates.length - 1]].total.confirmed;
    let TGtc2 = data.TG.dates[dates[dates.length - 2]].total.confirmed;
    let TGtr1 = data.TG.dates[dates[dates.length - 1]].total.recovered;
    let TGtr2 = data.TG.dates[dates[dates.length - 2]].total.recovered;
    let TGtd1 = data.TG.dates[dates[dates.length - 1]].total.deceased;
    let TGtd2 = data.TG.dates[dates[dates.length - 2]].total.deceased;
    document.getElementById('confirmed32').innerHTML = "Confirmed: " + TGtc1 + " + " + (TGtc1 - TGtc2);
    document.getElementById('death32').innerHTML = "Death: " + TGtd1 + " + " + (TGtd1 - TGtd2);
    document.getElementById('recovered32').innerHTML = "Recovered: " + TGtr1 + " + " + (TGtr1 - TGtr2);
    let TRtc1 = data.TR.dates[dates[dates.length - 1]].total.confirmed;
    let TRtc2 = data.TR.dates[dates[dates.length - 2]].total.confirmed;
    let TRtr1 = data.TR.dates[dates[dates.length - 1]].total.recovered;
    let TRtr2 = data.TR.dates[dates[dates.length - 2]].total.recovered;
    let TRtd1 = data.TR.dates[dates[dates.length - 1]].total.deceased;
    let TRtd2 = data.TR.dates[dates[dates.length - 2]].total.deceased;
    document.getElementById('confirmed33').innerHTML = "Confirmed: " + TRtc1 + " + " + (TRtc1 - TRtc2);
    document.getElementById('death33').innerHTML = "Death: " + TRtd1 + " + " + (TRtd1 - TRtd2);
    document.getElementById('recovered33').innerHTML = "Recovered: " + TRtr1 + " + " + (TRtr1 - TRtr2);
    let UPtc1 = data.UP.dates[dates[dates.length - 1]].total.confirmed;
    let UPtc2 = data.UP.dates[dates[dates.length - 2]].total.confirmed;
    let UPtr1 = data.UP.dates[dates[dates.length - 1]].total.recovered;
    let UPtr2 = data.UP.dates[dates[dates.length - 2]].total.recovered;
    let UPtd1 = data.UP.dates[dates[dates.length - 1]].total.deceased;
    let UPtd2 = data.UP.dates[dates[dates.length - 2]].total.deceased;
    document.getElementById('confirmed34').innerHTML = "Confirmed: " + UPtc1 + " + " + (UPtc1 - UPtc2);
    document.getElementById('death34').innerHTML = "Death: " + UPtd1 + " + " + (UPtd1 - UPtd2);
    document.getElementById('recovered34').innerHTML = "Recovered: " + UPtr1 + " + " + (UPtr1 - UPtr2);
    let UTtc1 = data.UT.dates[dates[dates.length - 1]].total.confirmed;
    let UTtc2 = data.UT.dates[dates[dates.length - 2]].total.confirmed;
    let UTtr1 = data.UT.dates[dates[dates.length - 1]].total.recovered;
    let UTtr2 = data.UT.dates[dates[dates.length - 2]].total.recovered;
    let UTtd1 = data.UT.dates[dates[dates.length - 1]].total.deceased;
    let UTtd2 = data.UT.dates[dates[dates.length - 2]].total.deceased;
    document.getElementById('confirmed35').innerHTML = "Confirmed: " + UTtc1 + " + " + (UTtc1 - UTtc2);
    document.getElementById('death35').innerHTML = "Death: " + UTtd1 + " + " + (UTtd1 - UTtd2);
    document.getElementById('recovered35').innerHTML = "Recovered: " + UTtr1 + " + " + (UTtr1 - UTtr2);
    let WBtc1 = data.WB.dates[dates[dates.length - 1]].total.confirmed;
    let WBtc2 = data.WB.dates[dates[dates.length - 2]].total.confirmed;
    let WBtr1 = data.WB.dates[dates[dates.length - 1]].total.recovered;
    let WBtr2 = data.WB.dates[dates[dates.length - 2]].total.recovered;
    let WBtd1 = data.WB.dates[dates[dates.length - 1]].total.deceased;
    let WBtd2 = data.WB.dates[dates[dates.length - 2]].total.deceased;
    document.getElementById('confirmed36').innerHTML = "Confirmed: " + WBtc1 + " + " + (WBtc1 - WBtc2);
    document.getElementById('death36').innerHTML = "Death: " + WBtd1 + " + " + (WBtd1 - WBtd2);
    document.getElementById('recovered36').innerHTML = "Recovered: " + WBtr1 + " + " + (WBtr1 - WBtr2);
}

charttotalcases();
async function charttotalcases() {
    let data = await getData();
    let ctx = document.getElementById('myChart').getContext('2d');
    Chart.defaults.font.size = 12;
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
    // document.getElementById('TotalVaccinated').style.height = '600px';
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
