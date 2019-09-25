import React, { useState } from 'react';
import OtherTable from './other_table';
import {TO_WATCH_MOVIE_LIST} from '../globals';

function ToWatch() {

  const [movies,] = useState(localStorage.getItem(TO_WATCH_MOVIE_LIST) ? JSON.parse(localStorage.getItem(TO_WATCH_MOVIE_LIST)) : []);

  return(
    <div className="container">
      <OtherTable movies={movies} hasPagination={false} list={TO_WATCH_MOVIE_LIST}/>
    </div>
  )
}

export default ToWatch;
