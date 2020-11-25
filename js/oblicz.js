function oblicz() {
    const zaok = 5;

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
