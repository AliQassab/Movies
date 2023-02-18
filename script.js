let movieData = {
  "The Darjeeling Limited": {
    id: 1,
    image: "./img/darjeeling.jpeg",
    plot: "A year after their father's funeral, three brothers travel across India by train in an attempt to bond with each other.",
    cast: ["Jason Schwartzman", "Owen Wilson", "Adrien Brody"],
    runtime: 151,
    rating: 7.2,
    year: 2007,
  },
  "The Royal Tenenbaums": {
    id: 2,
    image: "./img/royal.jpeg",
    plot: "The eccentric members of a dysfunctional family reluctantly gather under the same roof for various reasons",
    rating: 7.6,
    year: 2001,
    cast: ["Gene Hackman", "Gwnyeth Paltrow", "Anjelica Huston"],
    runtime: 170,
  },
  "Fantastic Mr. Fox": {
    id: 3,
    image: "./img/fantastic.jpeg",
    year: 2009,
    plot: "An urbane fox cannot resist returning to his farm raiding ways and then must help his community survive the farmers' retaliation.",
    cast: [
      "George Clooney",
      "Meryl Streep",
      "Bill Murray",
      "Jason Schwartzman",
    ],
    runtime: 147,
    rating: 7.9,
  },
  "The Grand Budapest Hotel": {
    id: 4,
    image: "./img/Budapest.jpeg",
    rating: 8.1,
    runtime: 159,
    year: 2014,
    plot: "A writer encounters the owner of an aging high-class hotel, who tells him of his early years serving as a lobby boy in the hotel's glorious years under an exceptional concierge.",
    cast: ["Ralph Fiennes", "F. Murray Abraham", "Mathieu Amalric"],
  },
};

const movieContainer = document.querySelector("#movie-list");

///render the movieData object

const renderMovies = () => {
  Object.entries(movieData).forEach(([title, data]) => {
    const markup = `
    <div class="movie-card">
            <img src="${data.image}" alt="Budapest">
           
            <h2 class="title">${title}</h2>
            <div class="year-time">

                <span class="year">${data.year}</span>
                <span class="runtime">${data.runtime} min</span>
            </div>
            <p class="plot"> ${data.plot}</p>
            <div class="cast"><h4>Cast</h4>${data.cast
              .map((name) => {
                return `<span>${name}</span>`;
              })
              .join("")} 
              
            </div>
            <div class="card-bottom">
            <div class="star-icons">
               <i class="fa-solid fa-star"></i>
               <i class="fa-solid fa-star"></i>
               <i class="fa-solid fa-star"></i>
               <i class="fa-solid fa-star"></i>
              <i class="fa-regular fa-star">
              </i><i class="fa-solid fa-star-half"></i>
            
        
                  <span class="rating">
                      ${data.rating}</span>
            </div>
            <button class="edit btn" data-id="${data.id}">Edit</button>
            </div>
        </div>
    
    `;
    movieContainer.insertAdjacentHTML("beforeend", markup);
  });
};
renderMovies();
////////// add new movie to UI
const renderNewMovie = () => {
  movies.map((movie) => {
    const markup = `
    <div class="movie-card">
            <img src="${movie.image}" alt="Budapest">
            <h2 class="title">${movie.title}</h2>
            <div class="year-time">

                <span class="year">${movie.year}</span>
                <span class="runtime">${movie.runtime} min</span>
            </div>
            <p class="plot"> ${movie.plot}</p>
            <div class="cast"><h4>Cast</h4> ${movie.cast
              .map((name) => {
                return `<span>${name}</span>`;
              })
              .join("")} 
              
            </div>
            <div>
            <div class="star-icons">
               <i class="fa-solid fa-star"></i>
               <i class="fa-solid fa-star"></i>
               <i class="fa-solid fa-star"></i>
               <i class="fa-solid fa-star"></i>
              <i class="fa-regular fa-star"><i class="fa-solid fa-star-half"></i></i>
        
                  <span class="rating">
                      ${movie.rating}</span>
            </div>
            <button class="edit">Edit</button>
            </div>
        </div>
    
    `;
    movieContainer.insertAdjacentHTML("beforeend", markup);
  });
};

///////////////////
let image;
const form = document.querySelector("#new-movie");
////upload new image and image updated
document.addEventListener("change", (e) => {
  if (e.target.matches("#newImg") || e.target.matches("#fileImg")) {
    const readImage = new FileReader();
    readImage.onload = function () {
      const img = new Image();
      image = img.src;
      image = readImage.result;
    };
    readImage.readAsDataURL(e.target.files[0]);
  }
});

function storeNewMovie(form) {
  let movieDataLength = Object.keys(movieData).length;
  let newMovie = {
    id: movieDataLength + 1,
    year: form.year.value,
    runtime: form.runtime.value,
    rating: form.rating.value,
    plot: form.plot.value,
    cast: [form.cast.value, form.cast1.value, form.cast2.value],
    image: image,
  };
  let title = form.title.value;

  movieData[title] = newMovie;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  storeNewMovie(form);
  movieContainer.innerHTML = "";
  renderMovies();
});

const findMovieById = (id) => {
  for (let [key, value] of Object.entries(movieData)) {
    if (value.id == id) {
      return {
        title: key,
        data: value,
      };
    }
  }
};
let record;

const updateMovieData = (id, updateMovie) => {
  record = findMovieById(id);
  if (record) {
    if (updateMovie.image === undefined) {
      updateMovie.image = record.data.image;
    }
    movieData[record.title] = Object.assign({}, record.data, updateMovie);
    movieContainer.innerHTML = "";
    renderMovies();
  }
};

///////////////////////////////////////////////
const showEditForm = (id) => {
  const form = document.querySelector("#edit-movie");

  form.style.display = "block";
  const record = findMovieById(id);
  if (record) {
    form.title.value = record.title;
    form.year.value = record.data.year;
    form.runtime.value = record.data.runtime;
    form.rating.value = record.data.rating;
    form.plot.value = record.data.plot;
    form.cast.value = record.data.cast;
  }
};
movieContainer.addEventListener("click", (e) => {
  const btn = e.target.closest(".edit");
  if (!btn) return;
  document.querySelector(".overlay").style.display = "block";

  let id = btn.dataset.id;
  console.log(id);
  record = findMovieById(id);
  updateBtn.setAttribute("data-id", id);
  showEditForm(id);
});
//////////////////////////////////////////

const updateBtn = document.querySelector(".update");
updateBtn.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("clicked");

  const form = document.querySelector("#edit-movie");

  let id = updateBtn.dataset.id;
  const updateMovie = {
    id: parseFloat(id),
    year: parseFloat(form.year.value),
    runtime: parseFloat(form.runtime.value),
    rating: form.rating.value,
    plot: form.plot.value,
    cast: [form.cast.value],
    image: image,
  };

  updateMovieData(id, updateMovie);
  console.log(updateMovie);
});

//////////////////////////////////////////////////////

document.addEventListener("click", (e) => {
  if (e.target.matches(".update") || e.target.matches(".close")) {
    document.querySelector("#edit-movie").style.display = "none";
    document.querySelector(".overlay").style.display = "none";
  }
});
document.addEventListener("click", (e) => {
  if (e.target.matches(".add-movie")) {
    form.style.display = "block";
    document.querySelector(".overlay").style.display = "block";
  }
});
document.addEventListener("click", (e) => {
  if (
    e.target === document.body ||
    e.target.matches(".close") ||
    e.target.matches(".add-new")
  ) {
    form.style.display = "none";
    document.querySelector(".overlay").style.display = "none";
  }
});
///////////sort movies by the year
const select = document.querySelectorAll("#select-movie");

const sortedMovieData = sortMoviesByYear(movieData);
let initialHTML = movieContainer.innerHTML;
select.forEach((selected) =>
  selected.addEventListener("change", function () {
    if (this.value === "Movie by the year") {
      movieData = sortMoviesByYear(movieData);
      movieContainer.innerHTML = "";
      renderMovies(sortedMovieData);
    } else {
      movieContainer.innerHTML = initialHTML;
    }
  })
);
function sortMoviesByYear(movies) {
  const movieTitles = Object.keys(movies).sort(
    (a, b) => movies[a].year - movies[b].year
  );
  const sortedMovies = movieTitles.reduce((acc, title) => {
    acc[title] = movies[title];
    return acc;
  }, {});
  return sortedMovies;
}

// function to search for a movie by title

let searchBars = document.querySelectorAll("#search-bar");

searchBars.forEach(function (searchBar) {
  searchBar.addEventListener("input", searchMovieByTitle);
});

function searchMovieByTitle(e) {
  let searchBar = e.target;
  let value = searchBar.value.toUpperCase();
  const movies = document.querySelectorAll(".movie-card");
  let movieFound = false;
  movies.forEach((movie) => {
    let span = movie.querySelector(".title");
    if (span.innerHTML.toUpperCase().includes(value)) {
      movieFound = true;
      movie.style.display = "";
    } else {
      movie.style.display = "none";
    }
  });
  if (!movieFound) {
    let message = document.querySelector("#message");
    message.innerHTML = "Movie not found. Please try another one.";
    message.style.display = "block";
  } else {
    let message = document.querySelector("#message");
    message.style.display = "none";
  }
}

///////side-bar
document.addEventListener("click", (e) => {
  if (e.target.matches(".fa-bars")) {
    document.querySelector(".side-bar-list").style.display = "block";
    document.querySelector(".fa-bars").style.display = "none";
    document.querySelector(".fa-xmark").style.display = "block";
  }
  if (e.target.matches(".fa-xmark")) {
    document.querySelector(".side-bar-list").style.display = "none";
    document.querySelector(".fa-bars").style.display = "block";
    document.querySelector(".fa-xmark").style.display = "none";
  }
});
/////
