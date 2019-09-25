export const CHANGE_PAGE = "CHANGE_PAGE";
export const UPDATE_MOVIES = "UPDATE_MOVIES";
export const CHANGE_QUERY = "CHANGE_QUERY";
export const REFRESH_MOVIES = "REFRESH_MOVIES";

export function changeThePage(pageNum) {
   return {
      type: CHANGE_PAGE,
      pageNum: pageNum
   }
}

export function updateMovies(movies) {
   return {
      type: UPDATE_MOVIES,
      movies: movies
   }
}

export function changeQuery(query) {
   return {
      type: CHANGE_QUERY,
      query: query
   }
}

export function refreshMovies() {
  return {
    type: REFRESH_MOVIES
  }
}
