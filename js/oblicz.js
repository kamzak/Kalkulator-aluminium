    // Licznik dla walidacji danych
    let count = 0;

// Pobranie wartości z pól tekstowych
    let ileOdlewow = document.getElementById("ileOdlewow").value;
    let ileOdlewowWR = document.getElementById("ileOdlewowWR").value;
    let ileWD = document.getElementById("ileWD").value;
    let wspK = document.getElementById("wspK").value;
    let paramC = document.getElementById("paramC").value;
    let uzysk = document.getElementById("uzysk").value;
    let wspKdlaCZ = document.getElementById("wspKdlaCZ").value;
    let objOdlewu = document.getElementById("objOdlewu").value;
    let gestStopu = document.getElementById("gestStopu").value;

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
    
function test() {
    // Test pola ilości odlewów
    if(document.getElementById("ileOdlewow").value >= 1){
        count++; 
        ileOdlewowT.setAttribute("class", "poprawnie");
    }
    else { 
        ileOdlewowT.setAttribute("class", "blad");
    }

    // Test pola ilości odlewów zasilanych przez układ
    if(document.getElementById("ileOdlewowWR").value >= 1){
        count++; 
        ileOdlewowWRT.setAttribute("class","poprawnie");
    }
    else { 
        ileOdlewowWRT.setAttribute("class","blad");
    }

    // Test liczby wlewów doprowadzających
    if(document.getElementById("ileWD").value >= 1){
        count++; 
        ileWDT.setAttribute("class","poprawnie");
    }
    else { 
        ileWDT.setAttribute("class","blad");
    }

    // Test współczynnika K(pk) 0,20 - 0,45
    if(document.getElementById("wspK").value >= 0.20 && document.getElementById("wspK").value <= 0.45){
        count++; 
        wspKT.setAttribute("class","poprawnie");
    }
    else { 
        wspKT.setAttribute("class","blad");
    }

    // Test parametru C
    if(document.getElementById("paramC").value > 0)
    {
        count++; 
        paramCT.setAttribute("class","poprawnie");
    } 
    else { 
        paramCT.setAttribute("class","blad");
    }

    // Test współcznnika k (uzysk)
    if (document.getElementById("uzysk").value > 0)
    {
        count++; 
        uzyskT.setAttribute("class","poprawnie");
    } 
    else { 
        uzyskT.setAttribute("class","blad");
    }

    // Test współczynnika k1 (dla czasu zalewania)
    if (document.getElementById("wspKdlaCZ").value > 0)
    {
        count++; 
        wspKdlaCZT.setAttribute("class","poprawnie");
    } 
    else { 
        wspKdlaCZT.setAttribute("class","blad");
    }

    // Test objętości surowego odlewu
    if (document.getElementById("objOdlewu").value > 0)
    {
        count++; 
        objOdlewuT.setAttribute("class","poprawnie");
    } 
    else { 
        objOdlewuT.setAttribute("class","blad");
    }

    // Test gęstości właściwej stopu
    if (document.getElementById("gestStopu").value > 0)
    {
        count++; 
        gestStopuT.setAttribute("class","poprawnie");
    } 
    else { 
        gestStopuT.setAttribute("class","blad");
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
        gestStopuT.classList.contains("poprawnie")){
        oblicz();
    }
    else {
        alert("Uzupełnij poprawnie wszystkie dane.");
    }
}


function oblicz() {
    const zaok = 5;
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

    // Funkcja zaokrąglająca
    function roundTo(value, places){
        let power = Math.pow(10, places);
        return Math.round(value * power) / power;
    }

    /* Obliczenia */

    // Obliczenie masy surowego odlewu
    let masaOdlewu = document.getElementById("masaOdlewu");
    masaOdlewu.innerHTML = roundTo(((gestStopu * objOdlewu) / 1000), 2);


    // Obliczenie masy surowego odlewu z układem zasilającym i wlewowym
    let masaOdlewuZUW = document.getElementById("masaOdlewuZUW");
    masaOdlewuZUW.innerHTML = roundTo((masaOdlewu.innerHTML * uzysk), 2);

    // Zalecany czas zalewania
    let czasZ = document.getElementById("czasZ");
    czasZ.innerHTML = roundTo((wspKdlaCZ * Math.sqrt(masaOdlewuZUW.innerHTML)), 2);

    // Obliczenie sumy powierzchni przekrojów wlewów doprowadzających
    let suma = masaOdlewuZUW.innerHTML / (roundTo(czasZ.innerHTML, zaok) * wspK);
    let sumaPrzWD = document.getElementById("sumaPrzWD");
    sumaPrzWD.innerHTML = roundTo(suma, 2);

    // Obliczanie przekrojów wlewów doprowadzających
    let przWD = document.getElementById("przWD");
    przWD.innerHTML = roundTo((sumaPrzWD.innerHTML/ ileWD), 2)

    // Obliczenie przekroju wlewu rozprowadzającego
    let przWR = document.getElementById("przWR");
    przWR.innerHTML = roundTo((1.2 * ileOdlewowWR * sumaPrzWD.innerHTML), 2);

    // Obliczenie przekroju wlewu głównego
    let przWG = document.getElementById("przWG");
    przWG.innerHTML = roundTo((1 * ileOdlewow * sumaPrzWD.innerHTML), 2);

    // Obliczenie pojemności zbiornika wlewowego
    let objZW = document.getElementById("objZW");
    objZW.innerHTML = roundTo(((masaOdlewuZUW.innerHTML*ileOdlewow*1000)/(gestStopu * czasZ.innerHTML)), 2);

    // Prędkość liniowa podnoszenia się metalu w formie
    let prLin = document.getElementById("prLin");
    prLin.innerHTML = roundTo((paramC / czasZ.innerHTML), 2);

    // Ukrycie pierwszej strony
    let container = document.getElementById("container");
    container.style.display = "none";
    
    // Pokazanie tabeli z wynikami
    let wynik = document.getElementById("wynik");
    wynik.style.display = "block";
}