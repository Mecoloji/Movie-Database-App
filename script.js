let movieNameRef = document.getElementById("search-inp");
let searchBtn = document.getElementById("search-btn");
let result = document.getElementById("result");

// ? searching by pressing Enter
movieNameRef.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("search-btn").click();
  }
});

let getMovie = () => {
  let movieName = movieNameRef.value;
  let url = `http://www.omdbapi.com/?t=${movieName}&apikey=${key}&`;
  // ? if input field is empty
  if (movieName.length <= 0) {
    result.innerHTML = `<h3 class="msg">Please Enter  Movie or Series Name...</h3>`;
  }
  // ? if input field is NOT empty
  else {
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        // ? if movie exists in database
        if (data.Response == "True") {
          console.log(data);
          result.innerHTML = `
                <div class="info">
                    <img src=${data.Poster} class="poster">
                    <div>
                        <h2>${data.Title}</h2>
                        <div class="rating">
                            <img src="/icon/star-icon.svg">
                            <h4>${data.imdbRating}</h4>
                        </div>
                        <div class="details">
                        <i class="fa-solid fa-calendar-days"></i>
                            <span>${data.Year}</span>
                        <i class="fa-solid fa-clock"></i>
                            <span>${data.Runtime}</span>
                        </div>
                        <div class="type">
                            <div>${data.Type}</div>
                        </div>
                        <div class="genre">
                            <div>${data.Genre.split(",").join(
                              "</div><div>"
                            )}</div>
                        </div>
                    </div>
                </div>
                <div>
                  <h3>Writer :</h3>
                   <p>${data.Writer}</p>
                  <h3>Plot :</h3>
                   <p>${data.Plot}</p>
                  <h3>Cast :</h3>
                   <p>${data.Actors}</p>
                  <h3>Awards :</h3>
                   <p>${data.Awards}</p>
                </div>
            `;
        }
        // ? if movie does NOT exists in database
        else {
          result.innerHTML = `<h3 class="msg"> ${data.Error}</h3>`;
        }
      })
      // ? if error occurs
      .catch(() => {
        result.innerHTML = `<h3 class="msg">Error Occured</h3>`;
      });
  }
};

searchBtn.addEventListener("click", getMovie);
window.addEventListener("load", getMovie);
