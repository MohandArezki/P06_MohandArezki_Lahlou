const baseUrl = "http://localhost:8000/api/v1/titles/";

// Define an array of categories
let categories = [
  {
    id: "best-movie", // Category's Id
    name: "Meilleur film", // Category's Name
    nbreMovies: 1, // number of movies for this category
    url: baseUrl + "?sort_by=-imdb_score", // Category 's Url
    moviesList: [] // Returned movies will be saved in array
  },
  {
    id: "best-rated",
    name: "Les mieux notés",
    nbreMovies: 7,
    url: baseUrl + "?sort_by=-imdb_score",
    moviesList: []
  },
  {
    id: "action-movies",
    name: "Action",
    nbreMovies: 7,
    url: baseUrl + "?sort_by=-votes,-imdb_score&genre=Action",
    moviesList: []
  },
  {
    id: "drama-movies",
    name: "Drame",
    nbreMovies: 7,
    url: baseUrl + "?sort_by=-votes,-imdb_score&genre=Drama",
    moviesList: []
  },
  {
    id: "romance-movies",
    name: "Romance",
    nbreMovies: 7,
    url: baseUrl + "?sort_by=-votes,-imdb_score&genre=Romance",
    moviesList: []
  }
 
];


// Get the hamburger icon element
const hamburger = document.querySelector(".hamburger");
// Get the navigation links element
const navLinks = document.querySelector(".nav_links");

// Add a click event listener to the hamburger icon
hamburger.addEventListener("click", () => {
  // Toggle the "open" class on the navigation links element
  navLinks.classList.toggle("open");
  // Toggle the "active" class on the hamburger icon element
  hamburger.classList.toggle("active");
});


// Get the preloader element
const loaderContainer = document.querySelector('.loader-container');
// To display the loading GIF 
const displayLoading = () => {
  loaderContainer.style.display = 'block';
};
// To hide the loading GIF
const hideLoading = () => {
  loaderContainer.style.display = 'none';
};

// Attach an event listener to the 'load' event of the window
window.addEventListener('load', () => {
  // Display the preloader
  displayLoading()
  // Fetch data asynchronously and wait for it to resolve
  fetchData().then(() => {
    // Loop through each category
    for (let i = 0; i < categories.length; i++) {
      // Call the setDetails function for each category
      setDetails(i);
    };
    // Hide the preloader once the data is loaded
    hideLoading();

    });
});


// Modal window
async function openModal(url) {
  const modal = document.getElementById("modal");

  const response = await fetch(url);
  const data = await response.json();

  html = `
  <div class="left">
  <img alt="movie img" src="${data.image_url}" id="modal-img">
  <div class="buttons">
    <button class="button"><i class="bi bi-play-fill"></i> Play</button>
  </div>
</div>
<div class="right">
  <span class="close">&times;</span>
  <h2 id="modal-title">${data.title}</h2>
  <p id="modal-desc">${data.long_description}</p>
  <div class="modal-list-detail">
    <ul class="flist-col">
      <li><span> Genre: </span><a>${data.genres}</a></li>
      <li><span> Pays: </span><a>${data.countries}</a></li>
      <li><span> Réalisateurs: </span><a>${data.directors}</a></li>
      <li><span> Acteurs: </span><a>${data.actors}</a></li>
      <li>
        <span> Date: </span><a>${data.date_published}</a>
        <span> Durée : </span><a> ${data.duration} Min. </a></li>
      <li>
        <span> Imdb score: </span><a>${data.imdb_score} /10 </a>
        <span> Note: </span><a>${data.rated} </a>
      </li>
    </ul>
  </div>
</div>
</div>
  `
  modal.innerHTML = html;
  const overlay = document.getElementById('modal-overlay');
  const spanClose = document.getElementsByClassName("close")[0];

  modal.style.display = "flex";
  overlay.style.display = "block";

  spanClose.onclick = function () {
    overlay.style.display = "none";
    modal.style.display = "none"
  }
  window.onclick = function (event) {
    if (event.target === overlay) {
      overlay.style.display = "none";
      modal.style.display = "none";
    }
  };

}  

// Generate HTML for "main-container"
function setDetails(iCategory) {
  const category = categories[iCategory];

  if (category.id === "best-movie") {
    // Generate HTML content for best-movie category
    const html = `
      <section>
          <div class="header" id="sect-${category.id}"> 
          <h1>${category.name}</h1>
        </div>
        <div class="left">
          <img id="${category.id}" alt="${category.name}" src="${category.moviesList[0].image_url}">
          <div class="buttons">
            <button>Play</button>
            <button onclick="openModal('${category.moviesList[0].url}')">More</button>
          </div>
        </div>
        <div class="right">
          <h2 id="mf-title">${category.moviesList[0].title}</h2>
          <p>${category.moviesList[0].description}</p>
          <div class="mf-list-detail">
            <ul class="flist-col">
              <li><span>Genre:</span><a>${category.moviesList[0].genres}</a></li>
              <li><span>Réalisateurs:</span><a>${category.moviesList[0].directors}</a></li>
              <li><span>Acteurs:</span><a>${category.moviesList[0].actors}</a></li>
              <li><span>Année:</span><a>${category.moviesList[0].year}</a></li>
              <li><span>Note:</span><a>${category.moviesList[0].imdb_score}</a></li>
            </ul>
          </div>
        </div>
        <div class="clear"></div>
      </section>
    `;

    document.querySelector('main').innerHTML += html;
  } else {
    // Generate HTML content for other categories
    const html = `
      <section>
        <div class="header"  id="sect-${category.id}">
          <h1>${category.name}</h1>
        </div>
        <div class="wrapper">
          <div class="slider" id="sl-${category.id}"></div>
        </div>
        <img onclick="move(${iCategory},1)" src="assets/images/chevron.png" class="chevron" id="nav-right">
        <img onclick="move(${iCategory},-1)" src="assets/images/chevron.png" class="chevron" id="nav-left">
      </section>
    `;

    document.querySelector('main').innerHTML += html;
    move(iCategory);
  }
}


function move(iCategory, sens) {
  // Retrieve the category object based on the provided index
  let category = categories[iCategory];

  // Move the first or last item in the moviesList array based on the provided direction
  if (sens) {
    const direction = sens === 1 ? 'right' : 'left';
    const moviesList = category.moviesList;
    
    if (direction === 'right') {
      moviesList.push(moviesList.shift());
      iCategory++;
    } else {
      moviesList.unshift(moviesList.pop());
      iCategory--;
    }
    
    iCategory = (iCategory + categories.length) % categories.length || categories.length;
  }
  // Get the container element with an ID of "sl-{category.id}"
  const mainContainer = document.getElementById("sl-" + category.id);

  // Clear the container's content
  mainContainer.innerHTML = '';
  // Iterate over the movies in the category's moviesList
  
  category.moviesList.forEach(function (movie) {
    // Create an <img> element
    const img = document.createElement("img");
  
    // Set the source (src) and alternate text (alt) attributes of the <img> element
    img.src = movie.image_url;
    img.alt = movie.url;
  
    // Add a click event listener to the <img> element
   // img.addEventListener('click', function () {
    //  openModal(movie.url);
   // });

    // Add onclick attribute to the <img> element
  img.setAttribute('onclick', 'openModal("'+movie.url+'");');
  // Append the <img> element to the mainContainer
  
    // Append the <img> element to the mainContainer
    mainContainer.appendChild(img);
  });

};

// Return Categories data

async function fetchData(){
  try {
    // Iterate over each category in the categories array
    for (const category of categories) {
      // Create an empty moviesList array and a count variable
      const moviesList = [];
      let count = 0;

      // Get the URL for the category
      let url = category.url;

      // Continue fetching movies until either the URL or the count exceeds the category's nbreMovies value
      while (url && count < category.nbreMovies) {
        // Fetch data from the current URL
        const response = await fetch(url);
        const { results, next } = await response.json();

        // Iterate over the movies in the results
        for (const movie of results) {
          // Fetch additional data for each movie
          const movieResponse = await fetch(movie.url);
          const movieData = await movieResponse.json();

          // Add the movie data to the moviesList array and increment the count
          moviesList.push(movieData);
          count++;

          // Break the loop if the count exceeds or equals the category's nbreMovies value
          if (count >= category.nbreMovies) {
            break;
          }
        }

        // Update the URL for the next page of results
        url = next;
      }

      // Update the moviesList property of the current category with the fetched movie data
      category.moviesList = moviesList;

      // create menu for the category
      const navLinks = document.getElementById('nav_links');
      navLinks.innerHTML += `<a href="#${category.id}"><i class="fa fa-film"></i> ${category.name}</a>`;
    }
  } catch (error) {
    // Log any errors that occur during the fetching process
    console.error(error);
  }
}
