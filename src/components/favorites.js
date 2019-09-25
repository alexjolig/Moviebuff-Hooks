import React, { useState } from 'react';
import OtherTable from './other_table';
import {FAV_MOVIE_LIST} from '../globals';

function Favorites() {

  const [movies,] = useState(localStorage.getItem(FAV_MOVIE_LIST) ? JSON.parse(localStorage.getItem(FAV_MOVIE_LIST)) : []);
  return(
    <div className="container">
      <OtherTable movies={movies} hasPagination={false} list={FAV_MOVIE_LIST}/>
    </div>
  )
}

export default Favorites;
