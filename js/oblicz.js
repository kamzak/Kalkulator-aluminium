// Pobranie pół tekstowych dla walidacji danych
let ileOdlewowT = document.getElementById("ileOdlewow");
let ileOdlewowWRT = document.getElementById("ileOdlewowWR");
let ileWDT = document.getElementById("ileWD");
let wspKT = document.getElementById("wspK");
let paramCT = document.getElementById("paramC");
let uzyskT = document.getElementById("uzysk");
let wspKdlaCZT = document.getElementById("wspKdlaCZ");
let objOdlewuT = document.getElementById("objOdlewu");
let gestStopuT = document.getElementById("gestStopu");
let fwdT = document.getElementById("fwd");
let fwrT = document.getElementById("fwr");
let fwgT = document.getElementById("fwg");
    
// Licznik dla walidacji danych
let count = 0;

// Funkcja sprawdzająca poprawność danych
function test() {
    // Test pola ilości odlewów
    if(document.getElementById("ileOdlewow").value >= 1){
        ileOdlewowT.setAttribute("class", "poprawnie");
    }
    else { 
        ileOdlewowT.setAttribute("class", "blad");
    }

    // Test pola ilości odlewów zasilanych przez układ
    if(document.getElementById("ileOdlewowWR").value >= 1){
        ileOdlewowWRT.setAttribute("class","poprawnie");
    }
    else { 
        ileOdlewowWRT.setAttribute("class","blad");
    }

    // Test liczby wlewów doprowadzających
    if(document.getElementById("ileWD").value >= 1){
        ileWDT.setAttribute("class","poprawnie");
    }
    else { 
        ileWDT.setAttribute("class","blad");
    }

    // Test współczynnika K(pk) 0,20 - 0,45
    if(document.getElementById("wspK").value >= 0.20 && document.getElementById("wspK").value <= 0.45){
        wspKT.setAttribute("class","poprawnie");
    }
    else { 
        wspKT.setAttribute("class","blad");
    }

    // Test parametru C
    if(document.getElementById("paramC").value > 0)
    {
        paramCT.setAttribute("class","poprawnie");
    } 
    else { 
        paramCT.setAttribute("class","blad");
    }

    // Test współcznnika k (uzysk)
    if (document.getElementById("uzysk").value > 0)
    {
        uzyskT.setAttribute("class","poprawnie");
    } 
    else { 
        uzyskT.setAttribute("class","blad");
    }

    // Test współczynnika k1 (dla czasu zalewania)
    if (document.getElementById("wspKdlaCZ").value > 0)
    {
        wspKdlaCZT.setAttribute("class","poprawnie");
    } 
    else { 
        wspKdlaCZT.setAttribute("class","blad");
    }

    // Test objętości surowego odlewu
    if (document.getElementById("objOdlewu").value > 0)
    { 
        objOdlewuT.setAttribute("class","poprawnie");
    } 
    else { 
        objOdlewuT.setAttribute("class","blad");
    }

    // Test gęstości właściwej stopu
    if (document.getElementById("gestStopu").value > 0)
    {
        gestStopuT.setAttribute("class","poprawnie");
    } 
    else { 
        gestStopuT.setAttribute("class","blad");
    }

    // Test stosunku powierzchni przekrojów elementów układu wlewowego
    // Fwd
    if(document.getElementById("fwd").value >= 2 && document.getElementById("fwd").value <= 6) {
        fwdT.setAttribute("class", "poprawnie");
    } else {
        fwdT.setAttribute("class", "blad");
    }
    // Fwr
    if(document.getElementById("fwr").value >= 1.2 && document.getElementById("fwr").value <= 2) {
        fwrT.setAttribute("class", "poprawnie");
    } else {
        fwrT.setAttribute("class", "blad");
    }
    // Fwg
    if(document.getElementById("fwg").value == 1) {
        fwgT.setAttribute("class", "poprawnie");
    } else {
        fwgT.setAttribute("class", "blad");
    }

    // Warunek poprawności danych
    if(ileOdlewowT.classList.contains("poprawnie") &&
        ileOdlewowWRT.classList.contains("poprawnie") &&
        ileWDT.classList.contains("poprawnie") &&
        wspKT.classList.contains("poprawnie") &&
        paramCT.classList.contains("poprawnie") &&
        uzyskT.classList.contains("poprawnie") &&
        wspKdlaCZT.classList.contains("poprawnie") &&
        objOdlewuT.classList.contains("poprawnie") &&
        gestStopuT.classList.contains("poprawnie") &&
        fwdT.classList.contains("poprawnie") &&
        fwrT.classList.contains("poprawnie")&&
        fwgT.classList.contains("poprawnie")){
        oblicz();
    }
    else {
        alert("Uzupełnij poprawnie wszystkie dane.");
    }
}


function oblicz() {
    const zaok = 3;
    console.log("funkcja oblicz");

    let ileOdlewow = document.getElementById("ileOdlewow").value;
    let ileOdlewowWR = document.getElementById("ileOdlewowWR").value;
    let ileWD = document.getElementById("ileWD").value;
    let wspK = document.getElementById("wspK").value;
    let paramC = document.getElementById("paramC").value;
    let uzysk = document.getElementById("uzysk").value;
    let wspKdlaCZ = document.getElementById("wspKdlaCZ").value;
    let objOdlewu = document.getElementById("objOdlewu").value;
    let gestStopu = document.getElementById("gestStopu").value;
    let fwd = document.getElementById("fwd").value;
    let fwr = document.getElementById("fwr").value;
    let fwg = document.getElementById("fwg").value;

    // Funkcja zaokrąglająca
    function roundTo(value, places){
        let power = Math.pow(10, places);
        return Math.round(value * power) / power;
    }

    /* Obliczenia */

    // Obliczenie masy surowego odlewu
    let masaOdlewu = document.getElementById("masaOdlewu");
    masaOdlewu.innerHTML = roundTo(((gestStopu * objOdlewu) / 1000), zaok);


    // Obliczenie masy surowego odlewu z układem zasilającym i wlewowym
    let masaOdlewuZUW = document.getElementById("masaOdlewuZUW");
    masaOdlewuZUW.innerHTML = roundTo((masaOdlewu.innerHTML * uzysk), zaok);

    // Zalecany czas zalewania
    let czasZ = document.getElementById("czasZ");
    czasZ.innerHTML = roundTo((wspKdlaCZ * Math.sqrt(masaOdlewuZUW.innerHTML)), 1);

    // Obliczenie sumy powierzchni przekrojów wlewów doprowadzających
    let suma = masaOdlewuZUW.innerHTML / (czasZ.innerHTML * wspK);
    let sumaPrzWD = document.getElementById("sumaPrzWD");
    sumaPrzWD.innerHTML = roundTo(suma, 1);

    // Obliczanie przekrojów wlewów doprowadzających
    let przWD = document.getElementById("przWD");
    przWD.innerHTML = roundTo((sumaPrzWD.innerHTML/ ileWD), 1)

    // Obliczenie przekroju wlewu rozprowadzającego
    let przWR = document.getElementById("przWR");
    przWR.innerHTML = roundTo(fwr * ileOdlewowWR * (sumaPrzWD.innerHTML/ileOdlewowWR), zaok);

    // Obliczenie przekroju wlewu głównego
    let przWG = document.getElementById("przWG");
    przWG.innerHTML = roundTo(fwg * ileOdlewow * (sumaPrzWD.innerHTML/ileOdlewowWR), zaok);

    // Obliczenie pojemności zbiornika wlewowego
    let objZW = document.getElementById("objZW");
    objZW.innerHTML = roundTo(((masaOdlewuZUW.innerHTML*ileOdlewow*1000)/(gestStopu * czasZ.innerHTML)), 1);

    // Prędkość liniowa podnoszenia się metalu w formie
    let prLin = document.getElementById("prLin");
    prLin.innerHTML = roundTo((paramC / czasZ.innerHTML),zaok);

    // Ukrycie pierwszej strony
    let container = document.getElementById("container");
    container.style.display = "none";
    
    // Pokazanie tabeli z wynikami
    let wynik = document.getElementById("wynik");
    wynik.style.display = "block";
}