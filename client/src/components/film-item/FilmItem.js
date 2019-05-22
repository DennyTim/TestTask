import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import './film-item.css';

const FilmItem = ({ films }) => {

  const { title, release, format, starlist, id, poster } = films;

  return (
    <Fragment>
      <li className="films-item">
        <img className="film-img" 
              src={poster} 
              alt="img"/>
        <div className="film-content">
          <h3 className="film-title">{title}</h3>
          <p className="film-release">Release year:&nbsp; {release}</p>
          <p className="film-format">Format:&nbsp; {format}</p>
          <span className="film-starring">Starring:&nbsp;</span>
          <ul className="film-starlist">
            {starlist.slice(0,3).map((item, index) => (
              <li className="film-starlist-item" key={index}>{item}</li>
            ))}
          </ul>
          <Link className="film-btn" to={`/film/${id}`}>More</Link>
        </div>
      </li>
    </Fragment>
  )
}

export default FilmItem;
