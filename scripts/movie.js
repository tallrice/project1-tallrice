const apiKey = "787a634e0403914629c5871a8d44f989";
const path = "https://api.themoviedb.org";

$(document).ready(function($) {

  var movie = localStorage.getItem("movie");
  getMovies(movie);

  function getMovies(movie) {
    var url = "https://api.themoviedb.org/3/movie/"
      + movie
      + "?api_key="
      + apiKey
      + "&language=en-US";

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
  $("#t-body").html("");
  var title = data["title"];
  var id = data["id"];
  var poster_path = "https://image.tmdb.org/t/p/w185_and_h278_bestv2/"
    + data["poster_path"];
  var bgUrl = "https://image.tmdb.org/t/p/w185_and_h278_bestv2/"
    + data["backdrop_path"];
  var overview = data["overview"];
  if (poster_path == "https://image.tmdb.org/t/p/w185_and_h278_bestv2/null") {
    poster_path = ""
  }
  var imgLink = "<img src='" + poster_path + "' alt='poster'>"
  var tableRow = "<tr>"
    + "<td>" + imgLink + "</td>"
    + "<td>" + overview + "</td>"
    + "</tr>";
  $("#t-body").append(tableRow);
  $("#title").html(title);
}
