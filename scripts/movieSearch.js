const apiKey = "787a634e0403914629c5871a8d44f989";
const path = "https://api.themoviedb.org";

$(document).ready(function($) {

  //populate dropdowns
  var val, text;
  for (text in year) {
    val = year[text];
    $('<option/>').val(val).text(text).appendTo($('#yearSelect'));
  }
  // http://jsfiddle.net/6pk4z72o/
  $('#yearSelect option').each(function () {
      $(this).prependTo($(this).parent());
  });
  for (text in genre) {
    val = genre[text];
    $('<option/>').val(val).text(text).appendTo($('#genreSelect'));
  }
  for (text in sort) {
    val = sort[text];
    $('<option/>').val(val).text(text).appendTo($('#sortSelect'));
  }

  // //button click method
  $("#getButton").click(function() {

    let yer = $('#yearSelect').val();
    let gnr= $('#genreSelect').val();
    let srt = $('#sortSelect').val();

    if (typeof(Storage) !== "undefined"){
      localStorage.setItem("year", yer);
      localStorage.setItem("genre", gnr);
      localStorage.setItem("sort", srt);
    }
    getMovies(yer, gnr, srt);

  });

  //default location
  var yer = localStorage.getItem("year");
  var gnr = localStorage.getItem("genre");
  var srt = localStorage.getItem("sort");
  if (yer === null || gnr === null || srt === null){
    yer = 2018;
    gnr = 28;
    srt = "popularity.desc";
  }

  //set user input to reflect default location
  $('#yearSelect').val(yer);
  $('#genreSelect').val(gnr);
  $('#sortSelect').val(srt);

  function getMovies(yer, gnr, srt) {
    var url = "https://api.themoviedb.org/3/discover/"
      + "movie?api_key="
      + apiKey
      + "&language=en"
      + "&with_original_language=en"
      + "&primary_release_year="
      + yer
      + "&with_release_type=3"
      + "&with_genres="
      + gnr
      + "&sort_by="
      + srt
      + "&include_adult=false"
      + "&include_video=false"
      + "&alternative_titles"
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

var sort = {
  'Sort by': '',
  'Popularity Ascending':'popularity.asc',
  'Popularity Descending':'popularity.desc',
  'Release Date Ascending':'release_date.asc',
  'Release Date Descending':'release_date.desc',
  'Title Ascending':'original_title.asc',
  'Title Descending':'original_title.desc',
  'Rating Ascending':'vote_average.asc',
  'Rating Descending':'vote_average.desc',
}

var genre = {
  'Select Genre': '',
  'Action':28,
  'Adventure':12,
  'Animation':16,
  'Comedy':35,
  'Crime':80,
  'Documentary':99,
  'Drama':18,
  'Family':10751,
  'Fantasy':14,
  'History':36,
  'Horror':27,
  'Music':10402,
  'Mystery':9648,
  'Romance':10749,
  'Science Fiction':878,
  'Thriller':53,
  'TV Movie':10770,
  'War':10752,
  'Western':37
};

var year = {
  'Select Year': '',
  '2018':2018,
  '2017':2017,
  '2016':2016,
  '2015':2015,
  '2014':2014,
  '2013':2013,
  '2012':2012,
  '2011':2011,
  '2010':2010,
  '2009':2009,
  '2008':2008,
  '2007':2007,
  '2006':2006,
  '2005':2005,
  '2004':2004,
  '2003':2003,
  '2002':2002,
  '2001':2001,
  '2000':2000,
  '1999':1999,
  '1998':1998,
  '1997':1997,
  '1996':1996,
  '1995':1995,
  '1994':1994,
  '1993':1993,
  '1992':1992,
  '1991':1991,
  '1990':1990,
  '1989':1989,
  '1988':1988,
  '1987':1987,
  '1986':1986,
  '1985':1985,
  '1984':1984,
  '1983':1983,
  '1982':1982,
  '1981':1981,
  '1980':1980,
  '1979':1979,
  '1978':1978,
  '1977':1977,
  '1976':1976,
  '1975':1975,
  '1974':1974,
  '1973':1973,
  '1972':1972,
  '1971':1971,
  '1970':1970,
  '1969':1969,
  '1968':1968,
  '1967':1967,
  '1966':1966,
  '1965':1965,
  '1964':1964,
  '1963':1963,
  '1962':1962,
  '1961':1961,
  '1960':1960,
  '1959':1959,
  '1958':1958,
  '1957':1957,
  '1956':1956,
  '1955':1955,
  '1954':1954,
  '1953':1953,
  '1952':1952,
  '1951':1951,
  '1950':1950,
  '1949':1949,
  '1948':1948,
  '1947':1947,
  '1946':1946,
  '1945':1945,
  '1944':1944,
  '1943':1943,
  '1942':1942,
  '1941':1941,
  '1940':1940,
  '1939':1939,
  '1938':1938,
  '1937':1937,
  '1936':1936,
  '1935':1935,
  '1934':1934,
  '1933':1933,
  '1932':1932,
  '1931':1931,
  '1930':1930,
  '1929':1929,
  '1928':1928,
  '1927':1927,
  '1926':1926,
  '1925':1925,
  '1924':1924,
  '1923':1923,
  '1922':1922,
  '1921':1921,
  '1920':1920,
  '1919':1919,
  '1918':1918,
  '1917':1917,
  '1916':1916,
  '1915':1915,
  '1914':1914,
  '1913':1913,
  '1912':1912,
  '1911':1911,
  '1910':1910,
  '1909':1909,
  '1908':1908,
  '1907':1907,
  '1906':1906,
  '1905':1905,
  '1904':1904,
  '1903':1903,
  '1902':1902,
  '1901':1901,
  '1900':1900
}
