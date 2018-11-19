const apiKey = "787a634e0403914629c5871a8d44f989";
const path = "https://api.themoviedb.org";

$(document).ready(function($) {

  var movie = localStorage.getItem("movie");
  getSimilar(movie);

  function getSimilar(movie) {
    var url = "https://api.themoviedb.org/3/movie/"
      + movie
      + "/similar"
      + "?api_key="
      + apiKey
      + "&language=en-US"
      + "&page=1";
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": url,
        "method": "GET",
        "headers": {},
        "data": "{}"
    }
    $.ajax(settings).done(function (response) {
        processData(response);
    });
  };
});

function processData(data){
  movies = data['results'];
  $("#t-body").html("");
  if (movies.length == 0){
    $("#t-body").append("No similar movies. Try another title")
  }

  for (movieNum in movies){
    var rank = parseInt(movieNum) + 1;
    var movie = movies[movieNum];
    var title = movie["title"];
    var id = movie["id"];
    var pop = movie["popularity"].toFixed(1);
    var vot = movie["vote_average"].toFixed(1);
    var rel = movie["release_date"];
    var poster_path = "https://image.tmdb.org/t/p/w185_and_h278_bestv2/"
      + movie["poster_path"];
    if (poster_path == "https://image.tmdb.org/t/p/w185_and_h278_bestv2/null") {
      poster_path = ""
    }
    var movie_path = "movie.html"
    var overview = movie["overview"];
    var titleLink = "<a href='" + movie_path + "' onclick='saveID(this);' id='" + movieNum + "'>" + title + "</a>";
    var imgLink = "<a href='" + movie_path + "' onclick='saveID(this);' id='" + movieNum + "'>"
      + " <img src='" + poster_path + "'</a>";
    var tableRow = "<tr>"
      + "<td>" + rank + "</td>"
      + "<td>" + imgLink + "</td>"
      + "<td>" + titleLink + "</td>"
      + "<td>" + pop + "</td>"
      + "<td>" + vot + "</td>"
      + "<td>" + rel + "</td>"
      + "</tr>";
    $("#t-body").append(tableRow);
  }
}

function saveID(link){
  localStorage.setItem("movie", movies[link.id]["id"]);
}

