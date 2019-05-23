import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getFilm, deleteFilm } from '../../actions/films';
import PropTypes from 'prop-types';
import Spinner from '../spinner';

import './film.css';

const Film = ({ getFilm, deleteFilm, match, history, film: { film, loading } }) => {

  const { id, title, poster, release, format, description, starlist } = film;

  useEffect(() => {
    getFilm(match.params.id)
  }, [getFilm, match.params.id]);

  return loading || match.params.id !== id ? <Spinner /> : (
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
            {starlist.map((item, index) => 
              <li className="more-starlist-item" key={index}>{item}</li>
            )}
          </ul>
          <button className="btn-trash" onClick={() => deleteFilm(id, history) }>Delete film</button>
        </div>
      </div>
    </div>
  )
}

Film.propTypes = {
  getFilm: PropTypes.func.isRequired,
  deleteFilm: PropTypes.func.isRequired,
  film: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  film: state.films
});

export default connect(mapStateToProps, { getFilm, deleteFilm })(Film);
