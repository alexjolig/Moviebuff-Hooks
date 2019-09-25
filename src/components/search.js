import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import {QUERY} from '../globals';
import {changeQuery} from '../actions';

function Search() {

  const [movieQuery, setMovieQuery] = useState(sessionStorage.getItem(QUERY) ? sessionStorage.getItem(QUERY) : "");
  const dispatch = useDispatch();

  useEffect(() => {
    //Get back the saved searched expression if any
    const lastQuery = sessionStorage.getItem(QUERY);
    if(lastQuery !== "" && lastQuery !== null)
      dispatch(changeQuery(lastQuery));
  }, [dispatch]); //,[] means that Only run useEffect once

  const changeHandler = (event) => {
    setMovieQuery(event.target.value);
  }
  const sendQuery = (e) => {
    if (e.keyCode === undefined || e.keyCode === 13) {
      dispatch(changeQuery(movieQuery));
      //Save the latest searched movie in local so that it can be displayed while switching back from favorites or to watch sections
      sessionStorage.setItem(QUERY, movieQuery);
    }
  }

  return (
    <div className="search-container">
      <input type="text" name="search" placeholder="Which movie you are looking for?" onChange={(e) => {changeHandler(e)}} onKeyDown={(e)=>{sendQuery(e)}} value={movieQuery}/>
      <button onClick={sendQuery} >Find My Movie!</button>
    </div>
  )
}

export default Search;
