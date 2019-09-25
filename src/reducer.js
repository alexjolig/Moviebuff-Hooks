import {CHANGE_PAGE, UPDATE_MOVIES, CHANGE_QUERY} from './actions';

const initialState = {
  movies: [],
  isAnyData:false,
  query: "", //movie title to search for
  currentPage: 1,
  pageCount: 0,
  postsPerPage: 20, //It has been set from the used API, Nothing I can modify
  pageNumbers2Display: 5, //Set an odd number > 1
};

const changePage = (state, action) => Object.assign({},state,{
  currentPage: action.pageNum
});

const updateMovies = (state, action) => {
  let movies = action.json.results;
  return Object.assign({},state,{
    movies: movies,
    pageCount: action.json.total_pages,
    isAnyData: movies.length > 0
  });
};

const changeQuery = (state, action) => Object.assign({},state,{
  query: action.query
});

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case CHANGE_PAGE:
      return changePage(state, action);
    case CHANGE_QUERY:
        return changeQuery(state, action);
    case UPDATE_MOVIES:
      return updateMovies(state, action);
    default:
      return state;
  }
}
