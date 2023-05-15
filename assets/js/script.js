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
  

  modal.style.display = "flex";  
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
    const html = `
        <section>
           <div class="header"> 
              <h1> ${category.name} </h1>
           </div>
            <div class="left">
            <img id="${category.id}" alt="${category.name}" src="${category.moviesList[0].image_url}">
            <div class="buttons">
              <button>Play</button>
              <button Onclick="openModal('${category.moviesList[0].url}')">More</button>
            </div>
          </div>
          <div class="right">
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
        <div class="clear"></div>
    </section>
    `;
    document.querySelector('main').innerHTML += html;      
  } else {
    const html = `
    <section id="sect-${category.id}">
      <div class="header"> 
           <h1> ${category.name} </h1>
      </div>
      <div class="wrapper" >
        <div class="slider" id="sl-${category.id}">
        </div>
        
      </div>
      
      <img Onclick="move(${iCategory},1)" src="assets/images/chevron.png" class="chevron" id="nav-right">
      <img Onclick="move(${iCategory},-1)" src="assets/images/chevron.png" class="chevron" id="nav-left">          

    </section>
  `;
    document.querySelector('main').innerHTML += html;


    move(iCategory,1)
    // sliders
  }

}

// move left or right
function move(iCategory,sens){
  let category = categories[iCategory]
  
  if (sens ===1){
    category.moviesList.push( category.moviesList.shift())
   }       
  else {
    category.moviesList.unshif( category.moviesList.pop())    
  }  
  // https://medium.com/@vandersonramos/moving-the-first-item-to-the-last-position-in-the-array-javascript-c8ba435efee3#:~:text=When%20you%20need%20to%20move,input%20to%20the%20function%20array.
  const mainContainer = document.getElementById("sl-"+category.id);
  mainContainer.innerHTML='';
  
  // create the image elements and set their source attribute

  category.moviesList.forEach(function(movie){
    const img = document.createElement("img");
    img.src = movie.image_url;
    img.alt = movie.url
    img.addEventListener('click', () => {
      openModal(movie.url);
    });
    mainContainer.appendChild(img);
})   
};


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
