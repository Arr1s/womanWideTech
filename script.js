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
		.then ( //2
			response /*3*/ => response.json() //4
		)
		.then ( //5
			jsonData /*6*/ => {return jsonData} //7
		)
	);
}

getData(urlAll).then( dataEverbody => {
    console.log(dataEverbody);
    let allPeople = dataEverbody.data;
    // let secondSection = document.querySelector('section:nth-of-type(2)');
    let thirdSection = document.querySelector('section:nth-of-type(3)');

    allPeople.forEach( person => { 
       let personName = person.name;
      //  let personImgSrc = 'https://fdnd.directus.app/assets/' + person.image;
      //  let personPeriod = person.period;
      //  let personWebsite = person.website;
       let personCodepen = person.codepen;
       let personGithub = person.github;
       let personCodepenShowcase = '/embed/' + person.codepen_demo;

      //  if (personWebsite) {
      //   // do nothing
      //  } else {
      //   personWebsite.style.display = 'none';
      //   console.log("no website")
      //  }
        
       if (personCodepen) {
        // do nothing
       } else {
        personCodepen = '';
        personCodepenShowcase = '';
       }

       if (personGithub) {
        // do nothing
       } else {
        personGithub = '';
       }



    //   let personHTML = `<article>
    //   <h3>${personName}</h3>
    //   <img src="${personImgSrc}" alt="${personName}">
    //   <p>${personPeriod}</p>` + (personWebsite ? `<a href="${personWebsite}">website</a>` : '' ) +
    //   (personGithub ? `<a href="${personGithub}">${personGithub}</a>` : '' )
    //   + (personCodepen ? `<iframe height=${iframeHeight} style="width: 100%; clip-path: circle(${clipPath}%);" scrolling="no" src="${personCodepen}${personCodepenShowcase}?default-tab=result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">` : '') +
    // `</iframe>
    // </article>`;

       let codepenShowcaseArticle = (personCodepen ? `<article>
        
         <iframe height="200" width="200" scrolling="no" src="${personCodepen}${personCodepenShowcase}?default-tab=result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true"></iframe> 
    <h3>${personName}</h3>
   
    </article>` : '');

    // voeg de HTML toe aan de section vóór het einde
    // secondSection.insertAdjacentHTML('beforeend', personHTML);
    thirdSection.insertAdjacentHTML('beforeend', codepenShowcaseArticle);
 }) 
});






// let slideIndex = 1;
// showSlides(slideIndex);

// // Next/previous controls
// function plusSlides(n) {
//   showSlides(slideIndex += n);
// }

// // Thumbnail image controls
// function currentSlide(n) {
//   showSlides(slideIndex = n);
// }

// function showSlides(n) {
//   let i;
//   let slides = document.getElementsByClassName("mySlides");
//   if (n > slides.length) {slideIndex = 1}
//   if (n < 1) {slideIndex = slides.length}
//   for (i = 0; i < slides.length; i++) {
//     slides[i].style.display = "none";
//   }
//   slides[slideIndex-1].style.display = "block";
// }


const state = {
  changed: null,
  changing: null,
  // queue: [],
  // count: 0,
}

scroller.addEventListener('scrollsnapchange', event => {state.changed?.classList.remove('change')
  event.snapTargetInline.classList.add('change')
  state.changed = event.snapTargetInline
  
  // setTimeout(() => {
  //   state.queue.push({
  //     parent: snapchange,
  //     child: message,
  //   })
  // }, 3000)
  
})

scroller.addEventListener('scrollsnapchanging', event => {
  // manage snapping state
  state.changed?.classList.remove('change')
  state.changing?.classList.remove('changing')
  event.snapTargetInline.classList.add('changing')
  state.changing = event.snapTargetInline
  
  // setTimeout(() => {
  //   state.queue.push({
  //     parent: snapchanging,
  //     child: message,
  //   })
  // }, 3000)

})

// setInterval(() => {
//   if (!state.queue.length) return
  
//   document?.startViewTransition 
//     ? document.startViewTransition(() => {
//         let node = state.queue.shift()
//         node.parent.removeChild(node.child)
//       })
//     : snapchanging.removeChild(state.queue.shift())
// }, 1000)

// snapalign.oninput = event => {
//   document.body.style.setProperty('--_snap-align', event.target.selectedOptions[0].innerText)
// }