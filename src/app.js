import axios from 'axios';

// * Op basis van de informatie uit de REST Countries API, haal je data op over _alle_ landen ter wereld en geef je deze in een lijst weer op de pagina;

// 1. API bekijken: endpoint All lijkt geschikt: https://restcountries.com/v2/all.
// 2. Axios installeren en importeren
// 3. Data ophalen van alle landen met GET request want we willen informatie ophalen.
// 4. Variabelen aanmaken voor het opvangen van resultaten en ook voor de uri en endpoint
// 5. Asynchrone functie schrijven fetchData met daarin async/await dan axios get request met uri+endpoint
// 6. Checken met npm run start of in console info wordt opgehaald
// 7. Try en catch blok erin verwerken voor errors: foutmeldingen aan koppelen voor op pagina: html span maken met id error-message en dat koppelen met JS en overschrijven met textContent.
// 8. Naam, vlag en population moeten worden opgehaald uit data; even zoeken op welk niveau dat staat: onder data keys name, flag en population. Variabelen aanmaken voor elke key.
// 9. Door deze data heen mappen met.notatie en zorgen dat de info ergens heen kan op pagina: html element maken in dit geval een ul en die koppelen aan JS.
// 10. Met methode adddocument list items aanmaken voor countrynames. Daaronder de .population key verwerken met innerHTML en backtics. Image toevoegen? Lukte niet op dezelfde manier dus innerHTML methode gebruikt zodat je daar de variabele als src kunt gebruiken.
// 11. Sorteren op populatie met sort methode van laag naar hoog dus a.population - b.population.
//
// 12. Schrijf een aparte functie die één regio-naam regio verwacht, en op basis van deze regio de correcte kleur-naam als string
// teruggeeft. Gebruik deze, om de naam van het land in de juiste kleur weer te geven op de pagina. _Tip_: zorg ervoor
// dat je CSS-classes maakt voor alle regio-kleuren!

// function countryByColour(regio) {
//     if (regio === "Africa") {
//         return "blue";
//     }
//     if (regio === "Americas") {
//         return "green";
//     }
//     if (regio === "Asia") {
//         return "red";
//     }
//     if (regio === "Europe") {
//         return "yellow";
//     }
//     if (regio === "Oceania") {
//         return "purple";
//     } else {
//         return "black";
//     }
// }
//
// // Hier de functie met kleuren aangeroepen
// console.log(countryByColour(country.region));

// Dit wordt te moeilijk want weet niet hoe ik met die functie nu de connectie moet maken met CSS. Hij werkte wel als ik hem aanriep onder de andere functie maar hoe ik dat koppel? Pak dus Elwyns snellere manier. Eerst in CSS classes aangemaakt voor elke regio en daar de juiste kleur aangekoppeld. Dan via innerHTML het connecten met JavaScript.
// Sowieso vond ik innerHTML methode veel handiger en simpeler werken dan al die createElements dus dat ga ik ook aanpassen. <span> ipv <h> voor naam zodat die samen met de vlag op 1 regel komt zoals voorbeeld.


async function fetchData() {
    const URI = 'https://restcountries.com/';
    const ENDPOINT = 'v2/all';
    try {
        const result = await axios.get(URI + ENDPOINT);
        const countries = result.data;

        // Hier destructuring toegepast:
        //     const { data: countries } = result;

        // Hier het resultaat gesorteerd:
        countries.sort((a, b) => a.population - b.population);

        // Hier door de resultaten heen mappen:
        countries.map((country) => {

            // Hier referentie aangemaakt voor de <ul> in HTML:
            const list = document.getElementById('list');

            // Wat variabelen aangemaakt om het makkelijker te maken:
            const flag = country.flag;
            const name = country.name;
            const pop = country.population;

            // En hier de innerHTML methode toegepast op de list:
            list.innerHTML += `<div class="inner-box"><img class="flagImage" src="${flag}" alt="${name}"/> <span id =countryName class="${country.region}">${name}</span>
            <p class=population >Has a population of ${pop} people</p></div>`
        });
    } catch (error) {
        console.error(error)
        const errorMessage = document.getElementById('error-message');
        if (error.result.status === 404) {
            errorMessage.textContent = "Page not found";
        }
        if (error.result.status === 500) {
            errorMessage.textContent = "Internal server error";
        }
    }
}

fetchData();


