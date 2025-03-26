// De app/website waar ik data vandaan wil halen
const baseURL = 'https://fdnd.directus.app/';


// De data die ik wil hebben van de website
const endpointAll = 'items/women_in_tech/';

// Samenvoeging om de URL te krijgen
const urlAll = baseURL + endpointAll;

console.log(urlAll)

// Functie om data op te halen
async /*9*/ function getData(URL) {
    return ( //8
        fetch(URL) //1
            .then( //2
                response /*3*/ => response.json() //4
            )
            .then( //5
                jsonData /*6*/ => { return jsonData } //7
            )
    );
}

getData(urlAll).then(dataEverbody => {
    console.log(dataEverbody);
    let allPeople = dataEverbody.data;
    let allSection = document.querySelector('section:nth-of-type(2)');

    allPeople.forEach(person => {
        let personName = person.name;
        let personImgSrc = 'https://fdnd.directus.app/assets/' + person.image;
        let personPeriod = person.period;
        let personWebsite = person.website;
        let personGithub = person.github;
        let personCodepen = person.codepen;
        let personShortName = person.short_name;
        let personCountry = person.country;
        let personWork = person.work;
        console.log(personWebsite)


        // laat linkjes alleen zien als ze er zijn
        let githubLink = personGithub
            ? `<a href="${personGithub}">Github van: ${personShortName}</a>`
            : '';
            
        let codepenlink = personCodepen
        ? `<a href="${personCodepen}">Codepen van: ${personShortName}</a>`
        : '';

        let websitelink = personWebsite
        ? `<a href="${personWebsite}">Website van: ${personShortName}</a>`
        : '';

        let workDisplay = personWork
        ? ` <p>${personWork}</p>`
        : '';

        // let personHTML = 
        // `<section class="sidecard">
        //     <img src="${personImgSrc}" alt="">
        //     ${workDisplay}
        //     <h2>${personName}</h2>
        //     <div class="tags-container">
        //         <p>${personShortName}</p>
        //         <p>${personPeriod}</p>
        //         <p>${personCountry}</p>
        //     </div>
        //     <h3>Visit:</h3>
        //     <div class="link-container">
        //         ${githubLink}
        //         ${codepenlink}
        //         ${websitelink}
        // </div>
        // </section>`;
        // voeg de HTML toe aan de section vóór het einde
        allSection.insertAdjacentHTML('beforeend', personHTML);
    })
});


