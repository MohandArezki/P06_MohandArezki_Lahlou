const baseUrl = "http://localhost:8000/api/v1/titles/";

let categories = [
  {id:"best-movie", name:" Meilleur film",nbreMovies:1, url: baseUrl+"?sort_by=-imdb_score",moviesList:[]},// /?sort_by=-votes,-imdb_score : est ce qu'il faut prendre en compte le nombre de votes ?
  {id:"best-rated", name:" Les mieux notés",nbreMovies:7,url: baseUrl+"?sort_by=-imdb_score",moviesList:[],SlideInFirstPosition:1},
  {id:"action-movies", name:" Action",nbreMovies:7,url: baseUrl+"?sort_by=-votes,-imdb_score&genre=Action",moviesList:[],SlideInFirstPosition:1},
  {id:"drama-movies", name:" Drame",nbreMovies:7,url: baseUrl+"?sort_by=-votes,-imdb_score&genre=Drama",moviesList:[],SlideInFirstPosition:1},
  {id:"romance-movies", name:" Romance",nbreMovies:7,url: baseUrl+"?sort_by=-votes,-imdb_score&genre=Romance",moviesList:[],SlideInFirstPosition:1}
];

window.addEventListener('load', () => {
  fetchData().then(() => {
    for (let i = 0; i < categories.length; i++) {
      createSection(i);
      setDetails(i);
    };
  }
)});

// Modal window
async function openModal(url) {
  const modal = document.getElementById("modal");
  const span = document.getElementsByClassName("close")[0];
  
  const title = document.getElementById("modal-title");
  const img = document.getElementById("modal-img");
  const desc = document.getElementById("modal-desc");
  const genres = document.querySelector('.flist-col:first-child li:first-child a');
  const directors = document.querySelector('.flist-col:first-child li:nth-child(2) a');
  const actors = document.querySelector('.modal-list-detail .flist-col:first-child li:nth-child(3) a');
  const year = document.querySelector('.modal-list-detail .flist-col:first-child li:nth-child(4) a');
  
  const response = await fetch(url);
  const data = await response.json();
  
  title.innerHTML = data.title;
  img.src = data.image_url;
  desc.innerHTML = data.description;
  genres.innerHTML = data.genres;
  directors.innerHTML = data.directors;
  actors.innerHTML = data.actors;
  
  year.innerHTML = data.year;
  

  modal.style.display = "block";  
  span.onclick = function () {
    modal.style.display = "none"
  }
  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };
}

// Generate HTML for "main-container"
function setDetails(iCategory) {
  const category =categories[iCategory]
  if (category.id === "best-movie") {
    const mainContainer = document.getElementById(`mc-${category.id}`);
    const html = `
      <div class="container-left">
        <img id="${category.id}" alt="${category.name}" src="${category.moviesList[0].image_url}">
        <div class="buttons">
          <button class="button"><i class="bi bi-play-fill"></i> Play</button>
          <button class="button" Onclick="openModal('${category.moviesList[0].url}')"><i class="bi bi-info-circle"></i> More ...</button>
        </div>
      </div>
      <div class="container-right">
        <h2 id="mf-title">${category.moviesList[0].title}</h2>
        <p>${category.moviesList[0].description}</p>
          <div class="mf-list-detail">
            <ul class="flist-col">
              <li><span>Genre: </span><a>${category.moviesList[0].genres}</a></li>
              <li><span>Réalisateurs: </span><a>${category.moviesList[0].directors}</a></li>
              <li><span>Acteurs: </span><a>${category.moviesList[0].actores}</a></li>
              <li><span>Année: </span><a>${category.moviesList[0].year}</a></li>
              <li><span>Note: </span><a>${category.moviesList[0].imdb_score}</a></li>
            </ul>
          </div>
        </div>
      </div>
    `;
    mainContainer.innerHTML = html;
    
  } else {

    move(iCategory,1)
    // sliders
  }

}

// move left or right
function move(iCategory,sens){
  let category = categories[iCategory]
  let i = category.SlideInFirstPosition;
  let nbreSlides = category.moviesList.length;
  let DestSlider = new Array();
  let SourceSlider = category.moviesList
  let SlideEnCours = 1;

  while (DestSlider.length < nbreSlides) {
    DestSlider.push(SourceSlider[i-1]);
      if (i === nbreSlides) {
        i=1
      } else if (i === 0) {
        i= nbreSlides
      } else {
        i=i+sens
      }
        SlideEnCours ++;        
  }
  const mainContainer = document.getElementById("mc-"+category.id);
  mainContainer.innerHTML=
  `<div class="slide-nav">
    <img src="assets/images/chevron.png" id="nav-right">
    <img src="assets/images/chevron.png" id="nav-left">
  </div>`;
  // create the image elements and set their source attribute
  for (let i = 1; i <= nbreSlides; i++) {
    const img = document.createElement("img");
    img.src = DestSlider[i-1].image_url;
    img.alt = DestSlider[i-1].url
    img.addEventListener('click', () => {
      openModal(DestSlider[i-1].url);
    });
    mainContainer.appendChild(img);
  }
  if (category.SlideInFirstPosition === nbreSlides){
    category.SlideInFirstPosition=1
  }
  else {
    category.SlideInFirstPosition++}
  categories[iCategory].SlideInFirstPosition = category.SlideInFirstPosition;
}   



// Generate HTML section for category
function createSection(iCategory) {
  const category = categories[iCategory];
  const section = document.createElement('section');
  section.setAttribute('id', `sect-${category.id}`);

  const h1 = document.createElement('h1');
  h1.innerHTML = `<i class="fa fa-film"></i> ${category.name}`;
  section.appendChild(h1);

  const categoryDiv = document.createElement('div');
  categoryDiv.setAttribute('class', 'category');

  const mainContainer = document.createElement('div');
  mainContainer.setAttribute('class', 'main-container');
  mainContainer.setAttribute('id', `mc-${category.id}`);

  categoryDiv.appendChild(mainContainer);

  section.appendChild(categoryDiv);

  const main = document.querySelector('main');
  main.appendChild(section);
}


// Fetch data from API
async function fetchData() {
  try {
    for (const category of categories) {
      const moviesList = [];
      let count = 0;
      let url = category.url;

      while (url && count < category.nbreMovies) {
        const response = await fetch(url);
        const { results, next } = await response.json();

        for (const movie of results) {
          const movieResponse = await fetch(movie.url);
          const movieData = await movieResponse.json();

          moviesList.push(movieData);
          count++;

          if (count >= category.nbreMovies) {
            break;
          }
        }
        url = next;
      }

      category.moviesList = moviesList;
    }
  } catch (error) {
    console.error(error);
  }
}
