import axios from "axios";

// Op basis van de informatie uit de REST Countries API, haal je data op over één specifiek land per keer;
// Kies één land om mee te beginnen. Zorg ervoor dat de opgehaalde data op de volgende manier wordt weergegeven op de pagina:
//     [IMAGE: flag]
// [country-name]
//     [country-naam] is situated in [subarea-name]. It has a population of [amount] people.
//     The capital is [city] and you can pay with [currency]'s
// Houdt er rekening mee dat de meeste landen maar één valuta hebben, maar sommige landen (zoals Panama) hebben er twee. In dat geval moet er: and you can pay with [currency] and [currency]'s komen te staan;
// Er staat een zoekbalk op de pagina waarmee de gebruiker naar een land kan zoeken. De zoekopdracht wordt getriggered zodra de gebruiker op de 'zoek'-knop klikt of op ENTER drukt. De inhoud van het invoerveld wordt na iedere zoekopdracht geleegd;
// Wanneer de gebruiker zoekt naar een land dat niet bestaat, wordt er een foutmelding getoond. Wanneer de gebruiker daarna een nieuwe zoekopdracht maakt die wel correct is, moet de foutmelding weer verdwenen zijn.

// 1. Axios importeren
// 2. API bekeken en Name is geschikt. Variabele URI en ENDPOINT maken om te gebruiken in asynchrone functie. Let variabele gemaakt voor land. Resultaten opgehaald en uitgepuzzeld hoe aan te spreken (data[0]).
// 4. Functie schrijven om tweede valuta op te kunnen halen. Die waarde staat onder oneCountry.currencies[1].name. Iets met undefined/if-else proberen.

// function getCurrencies() {
//     if (oneCountry.currencies[1] !== undefined) {
//         return "oneCountry.currencies[0].name and + oneCountry.currencies[1].name."
//     } else {
//         return "oneCountry.currencies[0].name."
//     }
// }

// Yay hij werkt! Nu onder de andere functie kopieren en aanroepen in innerHTML.

async function fetchCountryNameData() {
    const URI = "https://restcountries.com/";
    const ENDPOINT = "v2/name/";
    let country = ""
    try {
        country = "nederland";
        const results = await axios.get(URI + ENDPOINT + country);
        const oneCountry = results.data[0];
        console.log(oneCountry);
        // 2. Naam en populatie loggen:
        // console.log(oneCountry.name + " " + oneCountry.population);

        function getCurrencies() {
            if (oneCountry.currencies[1] !== undefined) {
                return `${oneCountry.currencies[0].name}s and ${oneCountry.currencies[1].name}s`;
            } else {
                return `${oneCountry.currencies[0].name}s`;
            }
        }
        // 3. Referentie aanmaken naar div html zodat het resultaat op pagina verschijnt ipv console. Innerhtml aanmaken met verwijzingen naar juiste data.
        const countryInfo = document.getElementById("countryInformation");
        countryInfo.innerHTML = `<img id="flag" src="${oneCountry.flag}" alt="Country flag"/> <span class="country-name">${oneCountry.name}</span>
<p>${oneCountry.name} is situated in ${oneCountry.subregion}. It has a population of ${oneCountry.population} people.</p>
<p>The capital is ${oneCountry.capital} and you can pay with ${getCurrencies()}.</p>
 <p>They speak ${oneCountry.languages[0].name}.</p>
`;

    } catch (error) {
        console.error(error)

    }
}

fetchCountryNameData();
