console.log("hallo");

const fallbackWebsite = "https://youtu.be/dQw4w9WgXcQ";

// De app/website waar ik data vandaan wil halen
const baseURL = 'https://fdnd.directus.app/';

// De data die ik wil hebben van de website
const endpointAll = 'items/women_in_tech/';

// Samenvoeging om de URL te krijgen
const urlAll = baseURL + endpointAll;

console.log(urlAll)

// Functie om data op te halen
async function getData(URL) {
    return fetch(URL)
        .then(response => response.json())
        .then(jsonData => {
            return jsonData;
        })
        .catch(error => {
            console.error("Fout bij ophalen van data:", error);
            return null; // Voorkomt dat een fout de code crasht
        });
}



getData(urlAll).then(data => {
    // Check of data geldig is
    if (!data || !data.data) { 
        console.error("Data niet correct geladen!");
        return;
    }
    
    dataEverybody = data; // Data opslaan
    console.log("Opgehaalde data:", dataEverybody);
    let allPeople = dataEverybody.data;

    // HTML selecting
    let allSection = document.querySelector('section:nth-of-type(1)');
    let thirdSection = document.querySelector('section:nth-of-type(3)');
    let carouselUl = document.querySelector('ul');

    // For each person code
    allPeople.forEach(person => {
        // Defineren van database items
        let personName = person.name;
        let personImgSrc = 'https://fdnd.directus.app/assets/' + person.image;
        let personPeriod = person.period;
        let personWebsite = person.website;
        let personGithub = person.github;
        let personCodepen = person.codepen;
        let personShortName = person.short_name;
        let personCountry = person.country;
        let personWork = person.work;
        let personCodepenShowcase = '/embed/' + person.codepen_demo;
        let personID = person.id;

        // Laat linkjes alleen zien als ze er zijn
        let githubLink = personGithub ? `<a href="${personGithub}">Github van: ${personShortName}</a>` : '';
        let codepenlink = personCodepen ? `<a href="${personCodepen}">Codepen van: ${personShortName}</a>` : '';
        let websitelink = personWebsite ? `<a href="${personWebsite}">Website van: ${personShortName}</a>` : '';
        let workDisplay = personWork ? `<p>${personWork}</p>` : '';

        // sidecard HTML code
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
        //     </div>
        // </section>`;

        // codepen showcase HTML code
        let codepenShowcaseArticle = personCodepen 
            ? `<article>
                <iframe height="200" width="200" scrolling="no" src="${personCodepen}${personCodepenShowcase}?default-tab=result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true"></iframe> 
                <h3>${personName}</h3>
            </article>` 
            : '';

        // Foto's voor de orbiting li's code
        let fotoVrouwen = 
        `<li class="circle" style="--i:${personID};" data-period="${personPeriod}">
            <img src="${personImgSrc}" alt="foto van ${personName}">
        </li>`;

        // Voeg de HTML toe aan...
        // allSection.insertAdjacentHTML('beforeend', personHTML);
        thirdSection.insertAdjacentHTML('beforeend', codepenShowcaseArticle);
        carouselUl.insertAdjacentHTML('beforeend', fotoVrouwen);
    });

    // Roep filterData pas aan als data is geladen
    filterData();



});



// Scroll snap code
const state = {
    changed: null, 
    changing: null,
};

document.querySelector("#scroller").addEventListener('scrollsnapchange', event => {
    state.changed?.classList.remove('change');
    event.snapTargetInline.classList.add('change');
    state.changed = event.snapTargetInline;
});

document.querySelector("#scroller").addEventListener('scrollsnapchanging', event => {
    state.changed?.classList.remove('change');
    state.changing?.classList.remove('changing');
    event.snapTargetInline.classList.add('changing');
    state.changing = event.snapTargetInline;
});



// // ** Functie om CSS custom property bij te werken **
// function updateListCount() {
//   const visibleItems = document.querySelectorAll('ul li.circle:not([style*="display: none"])').length;
//   document.documentElement.style.setProperty("--n", visibleItems + 1); // Update --n op :root
// }

// ** Filter data function (met update van --n) **
function filterData() {
  const selectedPeriod = document.getElementById('periodSelect').value;
  const allListItems = document.querySelectorAll('ul li.circle');

  allListItems.forEach(item => {
      const itemPeriod = item.getAttribute('data-period');
      if (selectedPeriod === "all" || itemPeriod === selectedPeriod) {
          item.style.display = "block";
      } else {
          item.style.display = "none";
      }
  });

  // updateListCount(); // **Update --n na filtering**
}

