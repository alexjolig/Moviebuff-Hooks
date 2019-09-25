import React, { useState } from 'react';
import Pagination from './pagination';
import addMovie from '../globals';
import {FAV_MOVIE_LIST, TO_WATCH_MOVIE_LIST, movieExists} from '../globals';

function OtherTable(props) {

  const [movies, setMovies] = useState(props.movies);

  const addToList = (id, title, relDate, list) => {
    addMovie(id, title, relDate, list);

    setMovies(localStorage.getItem(props.list) ? JSON.parse(localStorage.getItem(props.list)) : []);
  }

  const Paginate = () => {
    return props.hasPagination ? <Pagination /> : null;
  }

  return(
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
        {movies.map((row) => (
          <tr key={row.id}>
            <td>{row.title}</td>
            <td>{row.release_date}</td>
            <td className="icon"><i className={(movieExists(row.id, FAV_MOVIE_LIST) ? "fas" : "far") + " fa-star"} onClick={()=>{addToList(row.id, row.title, row.release_date, FAV_MOVIE_LIST)}}></i></td>
            <td className="icon"><i className={movieExists(row.id, TO_WATCH_MOVIE_LIST) ? "fas fa-eye" : "far fa-eye-slash"} onClick={()=>{addToList(row.id, row.title, row.release_date, TO_WATCH_MOVIE_LIST)}}></i></td>
          </tr>
        ))}
        </tbody>
      </table>
      <Paginate />
    </div>
  )
}

export default OtherTable;
