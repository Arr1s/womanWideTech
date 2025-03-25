
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

    // HTML selecting
    let allSection = document.querySelector('section:nth-of-type(1)');
    let thirdSection = document.querySelector('section:nth-of-type(3)');
    let carouselUl = document.querySelector('ul')

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
        let personCodepenShowcase = '/embed/' + person.codepen_demo;
        let personID = person.id;
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


        let personHTML = 
        `<section class="sidecard">
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
      
        let codepenShowcaseArticle = (personCodepen ? `<article>
          <iframe height="200" width="200" scrolling="no" src="${personCodepen}${personCodepenShowcase}?default-tab=result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true"></iframe> 
          <h3>${personName}</h3>
         </article>` : '');
 
         let fotoVrouwen = 
         `<li class="circle" style="--i:${personID};">
         <img src="${personImgSrc}" alt="foto van ${personName}">
         </li>`
 

        // voeg de HTML toe aan de section vóór het einde
        allSection.insertAdjacentHTML('beforeend', personHTML);
        thirdSection.insertAdjacentHTML('beforeend', codepenShowcaseArticle);
        carouselUl.insertAdjacentHTML('beforeend', fotoVrouwen);
    })
});

const state = {
  changed: null,
  changing: null,
}

scroller.addEventListener('scrollsnapchange', event => {state.changed?.classList.remove('change')
  event.snapTargetInline.classList.add('change')
  state.changed = event.snapTargetInline
  
})

scroller.addEventListener('scrollsnapchanging', event => {
  // manage snapping state
  state.changed?.classList.remove('change')
  state.changing?.classList.remove('changing')
  event.snapTargetInline.classList.add('changing')
  state.changing = event.snapTargetInline

})

