import Movie from './movie';

const FAV_MOVIE_LIST = "faveMovieList";
const TO_WATCH_MOVIE_LIST = "toWatchMovieList";
const API_KEY = "YOUR_OWN_API_KEY";
const QUERY = "query";

//Add or remove a movie to/from favorites or to-watch list
function addMovie(id, title, relDate, list) {
  let movie = new Movie(id, title, relDate);
  let movieArray = localStorage.getItem(list) ? JSON.parse(localStorage.getItem(list)) : [];

  //if movie is already exists, then remove it, otherwise add it to the list
  if(movieExists(movie.id, list)) {
    movieArray = removeFromArray(movieArray, movie.id);
  }
  else{
    movieArray.push(movie);
  }
  localStorage.setItem(list, JSON.stringify(movieArray));
}

function removeFromArray(arr, id) {
   return arr.filter(function(item){
       return item.id !== id;
   });
}

function movieExists(id, list){
  let movieArray = localStorage.getItem(list) ? JSON.parse(localStorage.getItem(list)) : [];
  return movieArray.some(movie => movie.id === id)
}

export {addMovie as default, movieExists, FAV_MOVIE_LIST, TO_WATCH_MOVIE_LIST, API_KEY, QUERY};
