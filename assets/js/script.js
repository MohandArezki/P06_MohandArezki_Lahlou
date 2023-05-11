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
  desc.innerHTML = data.long_description;
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

// Fetch data from API and create section for category
async function createSection(category) {
  try {
    let moviesList = [];
    let count = 0;
    let url = category.url;
    const main = document.querySelector('main');
    // Fetch data from API
    while (url !== null && count < category.nbreMovies) {
      const response = await fetch(url);
      const data = await response.json();

      const results = data.results;
      for (const movie of results) {
        const response = await fetch(movie.url);
        const data = await response.json();

        moviesList.push(data);
        count++;
        if (count >= category.nbreMovies) {
          break;
        }
      }
      url = data.next;
    }

    // Create section for category
    if (category.id === "best-movie") {
      const section = document.createElement('section');
      section.setAttribute('id', category.id);
      
      const categoryTitle = document.createElement('h1');
      categoryTitle.innerHTML = `<i class="fa fa-film"></i> ${category.name}`;
      
      const categoryDiv = document.createElement('div');
      categoryDiv.setAttribute('class', 'category');
      /*
      const categoryTitle = document.createElement('h1');
      categoryTitle.innerHTML = `<i class="fa fa-film"></i> ${category.name}`;
      */
      const mainContainer = document.createElement('div');
      mainContainer.setAttribute('class', 'main-container');
      
      const containerLeft = document.createElement('div');
      containerLeft.setAttribute('class', 'container-left');
      
      const movieImage = document.createElement('img');
      movieImage.setAttribute('id', moviesList[0].id);
      movieImage.setAttribute('alt', moviesList[0].title);
      movieImage.setAttribute('src', moviesList[0].image_url);
      
      const buttonsDiv = document.createElement('div');
      buttonsDiv.setAttribute('class', 'buttons');
      
      const playButton = document.createElement('button');
      playButton.setAttribute('class', 'button');
      playButton.innerHTML = '<i class="bi bi-play-fill"></i> Play';
      
      const moreButton = document.createElement('button');
      moreButton.setAttribute('class', 'button');
      moreButton.innerHTML = '<i class="bi bi-info-circle"></i> More ...';
      moreButton.addEventListener('click', () => {
        openModal(moviesList[0].url);
      });
      
      const containerRight = document.createElement('div');
      containerRight.setAttribute('class', 'container-right');
      
      const movieTitle = document.createElement('h2');
      movieTitle.setAttribute('id', 'mf-title');
      movieTitle.innerHTML = moviesList[0].title;
      
      const movieDescription = document.createElement('p');
      movieDescription.innerHTML = moviesList[0].description;
      
      const movieDetails = document.createElement('div');
      movieDetails.setAttribute('class', 'mf-list-detail');
      
      const flist = document.createElement('ul');
      flist.setAttribute('class', 'flist-col');
      
      const genreLi = document.createElement('li');
      genreLi.innerHTML = `<span> Genre: </span><a>${moviesList[0].genres}</a>`;
      
      const directorsLi = document.createElement('li');
      directorsLi.innerHTML = `<span> Réalisateurs: </span><a>${moviesList[0].directors}</a>`;
      
      const yearLi = document.createElement('li');
      yearLi.innerHTML = `<span> Année: </span><a>${moviesList[0].year}</a>`;
      
      flist.appendChild(genreLi);
      flist.appendChild(directorsLi);
      flist.appendChild(yearLi);
      
      movieDetails.appendChild(flist);
      
      containerLeft.appendChild(movieImage);
      buttonsDiv.appendChild(playButton);
      buttonsDiv.appendChild(moreButton);
      containerLeft.appendChild(buttonsDiv);
      
      containerRight.appendChild(movieTitle);
      containerRight.appendChild(movieDescription);
      containerRight.appendChild(movieDetails);
      
      mainContainer.appendChild(containerLeft);
      mainContainer.appendChild(containerRight);
      
      section.appendChild(categoryTitle);
      categoryDiv.appendChild(mainContainer);
      
      section.appendChild(categoryDiv);
      
      main.appendChild(section);
    
    } else {

      const section = document.createElement('section');
      section.setAttribute('id', category.id);
      
      const categoryTitle = document.createElement('h1');
      categoryTitle.innerHTML = `<i class="fa fa-film"></i> ${category.name}`;
      
      const categoryDiv = document.createElement('div');
      categoryDiv.setAttribute('class', 'category');
      
      const mainContainer = document.createElement('div');
      mainContainer.setAttribute('class', 'main-container');
      
      section.appendChild(categoryTitle);
      categoryDiv.appendChild(mainContainer);
      
      section.appendChild(categoryDiv);
      
      main.appendChild(section);
    

      }
    
  } catch (error) {
    console.error(error);
  }
};



// Fetch data from API
const baseUrl = "http://localhost:8000/api/v1/titles/";
const categories = [
  {id:"best-movie", name:" Meilleur film",nbreMovies:1, url: baseUrl+"?sort_by=-imdb_score"},// /?sort_by=-votes,-imdb_score : est ce qu'il faut prendre en compte le nombre de votes ?
  {id:"best-rated", name:" Les mieux notés",nbreMovies:7,url: baseUrl+"?sort_by=-imdb_score"},
  {id:"action-movies", name:" Action",nbreMovies:7,url: baseUrl+"?sort_by=-imdb_score"},
  {id:"western-movies", name:" Western",nbreMovies:7,url: baseUrl+"?sort_by=-imdb_score"},


];

/* Create section for each category and fetch data */

categories.forEach(function(category) {
  createSection(category);
  
});
