import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getFilm, deleteFilm } from '../../actions/films';
import PropTypes from 'prop-types';
import Spinner from '../spinner';

import './film.css';

const Film = ({ getFilm, deleteFilm, match, history, film: { film, loading } }) => {

  const { uid, title, poster, release, format, description, starlist } = film;

  useEffect(() => {
    getFilm(match.params.id)
  }, [getFilm, match.params.id]);

  const modalOpen = (e) => {
    let modalWindow = document.querySelector('.modal');
    let pos = -100;
    let clear = setInterval(function() {
      pos < 0 ? modalWindow.style.top = `${pos+=4}%` : clearInterval(clear);
    }, 10);
    window.addEventListener('click', modalClose);
  }

  const modalClose = (e) => {
    let modalWindow = document.querySelector('.modal');
    let pos = 0;
    if (e.target === modalWindow || e.target.classList.contains('fa-times')) {
      let clear = setInterval(function() {
        pos > -100 ? modalWindow.style.top = `${pos-=5}%` : clearInterval(clear);
      }, 10);
      window.removeEventListener('click', modalClose);
    }    
  }

  return loading || match.params.id !== uid ? <Spinner /> : (
    <div className="container">
      <div className="modal">
        <div className="modal-content">
          <h1 className="modal-text">Are you sure you want to delete {title} ?</h1>
          <p className="modal-description">After pressing the button, the data cannot be restored.</p>
          <button className="modal-trash" onClick={() => deleteFilm(uid, history) }>Delete</button>
          <button className="btn-close" onClick={(e) => modalClose(e)}>
            <i className="fas fa-times"></i>
          </button>
        </div>
      </div>
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
          <button className="btn-trash" onClick={(e) => modalOpen(e)}>Delete film</button>
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
