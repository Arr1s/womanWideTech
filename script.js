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
    let thirdSection = document.querySelector('.container-codepen');
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
        let personHTML = 
        `<section class="sidecard" id="sidecard-${personID}">
            <img src="${personImgSrc}" alt="">
            ${workDisplay}
            <h2>${personName}</h2>
            <div class="tags-container">
                <p>${personShortName}</p>
                <p>${personPeriod}</p>
                <p>${personCountry}</p>
            </div>
            <h3>Visit:</h3>
            <div class="link-container">
                ${githubLink}
                ${codepenlink}
                ${websitelink}
            </div>
        </section>`;

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
        <a href="#card-scroll" data-id="${personID}">
        <img src="${personImgSrc}" alt="foto van ${personName}" data-id="${personID}">
          </a>
        </li>`;

        // Voeg de HTML toe aan...
        allSection.insertAdjacentHTML('beforeend', personHTML);
        thirdSection.insertAdjacentHTML('beforeend', codepenShowcaseArticle);
        carouselUl.insertAdjacentHTML('beforeend', fotoVrouwen);
    });
    
    document.querySelectorAll(".sidecard").forEach(sidecard => {
      sidecard.style.display = "none";
  });
  
  // Selecteer alle links in de lijst
  const links = document.querySelectorAll("ul li a");
    links.forEach(link => {
      link.addEventListener("click", function (event) {
        //   event.preventDefault(); // Voorkom standaard a-actie
  
          const clickedId = this.dataset.id; // Haal ID op
          console.log("Geklikt op ID:", clickedId);
  
          // Alle sidecards verbergen
          document.querySelectorAll(".sidecard").forEach(sidecard => {
              sidecard.style.display = "none";
          });
  
          // Juiste sidecard tonen
          const targetSidecard = document.getElementById(`sidecard-${clickedId}`);
          if (targetSidecard) {
              targetSidecard.style.display = "block"; // Zorg dat deze zichtbaar wordt
          }
      });
  });

});


// ** Functie om CSS custom property bij te werken **
function updateListCount(extraPadding) {
  const visibleItems = document.querySelectorAll('ul li.circle:not([style*="display: none"])').length;
  document.documentElement.style.setProperty("--n", visibleItems + extraPadding); // Update --n op :root
}

const select = document.querySelector("select");
select.onchange = () => {

  const selectedPeriod = document.getElementById('periodSelect').value;
  const allListItems = document.querySelectorAll('ul li.circle');

  const imageAnimation = document.querySelectorAll('ul li img');
  allListItems.forEach(item => {

    const itemPeriod = item.getAttribute('data-period');
    if (selectedPeriod === "all" || itemPeriod === selectedPeriod) {
    item.style.display = "block";
    } else {
    item.style.display = "none";
  }
  });

  imageAnimation.forEach(item => {
  item.getAnimations().forEach( anim => {
    anim.cancel();
    anim.play();
    })
  })
  updateListCount(selectedPeriod == 'all' ? 0 : 1); // **Update --n na filtering**
}


