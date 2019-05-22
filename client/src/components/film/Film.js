import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getFilm } from '../../actions/films';
import Spinner from '../spinner';

import './film.css';

const Film = ({ getFilm, match, film: { film, loading } }) => {

  const { title, poster, release, format, starlist, description } = film;

  useEffect(() => {
    getFilm(match.params.id)
  }, [getFilm]);

  return loading ? <Spinner /> : (
    <div className="container">
      <Link className="more-btn" to='/menu'>Back to menu</Link>
      <div className="wrapper">
        <img className="more-img" 
                src={poster} 
                alt="img"/>
        <div className="more-content">
          <h3 className="more-title">{title}</h3>
          <p className="more-release">Release year:&nbsp; <span>{release}</span></p>
          <p className="more-format">Format:&nbsp; <span>{format}</span></p>
          <div className="more-description">Description:&nbsp; 
            <p className="more-description-text">{description}</p>
          </div>
          <span className="more-starring">Starring:&nbsp;</span>
          <ul className="more-starlist">
            {starlist.map((item, index) => (
              <li className="more-starlist-item" key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

Film.propTypes = {
  getFilm: PropTypes.func.isRequired,
  film: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  film: state.films
});

export default connect(mapStateToProps, { getFilm })(Film);
