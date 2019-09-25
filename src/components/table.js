import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import  addMovie from '../globals';
import Pagination from './pagination';
import {FAV_MOVIE_LIST, TO_WATCH_MOVIE_LIST, movieExists} from '../globals';
import {changeThePage, refreshMovies} from '../actions';

function Table() {


  const props = useSelector(
    state => ({
      movies: state.movies,
      isAnyData: state.isAnyData,
      currentPage: state.currentPage,
      query: state.query
    })
  );
  const [finalQuery, setFinalQuery] = useState(props.query);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();

  //Simulate foceUpdate()
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);



  useEffect(() => {
    const getMovies = () => {
      if(props.query === "") return;
      dispatch(refreshMovies());
    }
    if(finalQuery !== props.query) {
      //to get back to page number one when searching for a new movie, we have to set both store state and this component state
      setFinalQuery(props.query);
      dispatch(changeThePage(1));
      setCurrentPage(1);
    }
    getMovies();
  }, [finalQuery, props.query, props.currentPage, currentPage, dispatch] );

  //add selected movie to favorites or to-watch list
  const addToList = (id, title, relDate, list) => {
    addMovie(id, title, relDate, list);
    forceUpdate();
  }

  if(props.isAnyData)
    return (
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Release Date</th>
              <th>Favorite</th>
              <th>To Watch</th>
            </tr>
          </thead>
          <tbody>
          {props.movies.map((row) => (
            <tr key={row.id}>
              <td>{row.title}</td>
              <td>{row.release_date}</td>
              <td className="icon"><i className={(movieExists(row.id, FAV_MOVIE_LIST) ? "fas" : "far") + " fa-star"} onClick={()=>{addToList(row.id, row.title, row.release_date, FAV_MOVIE_LIST)}}></i></td>
              <td className="icon"><i className={movieExists(row.id, TO_WATCH_MOVIE_LIST) ? "fas fa-eye" : "far fa-eye-slash"} onClick={()=>{addToList(row.id, row.title, row.release_date, TO_WATCH_MOVIE_LIST)}}></i></td>
            </tr>
          ))}
          </tbody>
        </table>
        <Pagination />
      </div>

    );
  else {
    return (
      <div className="table-container">
        <h2 className="no-results no-selection">Nothing To Watch!</h2>
      </div>
    );
  }
}

export default Table;
