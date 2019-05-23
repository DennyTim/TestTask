import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addFilm, getListFormat } from '../../actions/films';
import './film-form.css';

const FilmForm = ({ addFilm, getListFormat, history, list }) => {

  const [data, setData] = useState({title: "", format: "Change format", stars: "", description: ""});
  const [menuList, toggledList] = useState(false);

  useEffect(() => {
    getListFormat()
  }, [getListFormat]);

  const { title, format, release, stars, description } = data;
  const onChange = e => {
    setData({ ...data, [e.target.name]: e.target.value })
  };

  const onClick = e => {
    setData({ ...data, format: e.target.innerText })
  };

  return (
    <div className="container">
      <Link to="/menu" className="form-link">Menu</Link>
      <h1 className="form-title">Add New Film</h1>
      <form
         className="form-film"
         onSubmit={e => {
           e.preventDefault()
           addFilm(data, history)
         }}>
        <div className="form-film-item">
          <input 
            type="text" 
            placeholder="Title" 
            name="title" 
            value={title}
            onChange={ e => onChange(e)}/>
        </div>
        <div className="form-film-item">
          <button onClick={() => toggledList(!menuList)}>Click here</button> 
          <p onChange={ e => onChange(e)}
              onClick={() => toggledList(!menuList)}>{format}</p>
          <ul>
          {
            menuList ? 
              list.map((item, index) => 
                <li onClick={e => {
                  onClick(e)
                  toggledList(!menuList)
                }} key={index}>{item}</li>)
            : (null)
          }
          </ul>
        </div>
        <div className="form-film-item">
          <input 
            type="text" 
            placeholder="Year release" 
            name="release" 
            value={release}
            onChange={ e => onChange(e)}/>
        </div>
        <div className="form-film-item">
          <input 
            type="text" 
            placeholder="Stars" 
            name="stars" 
            value={stars}
            onChange={ e => onChange(e)}/>
        </div>
        <div className="form-film-item">
          <input 
            type="text" 
            placeholder="Description" 
            name="description" 
            value={description}
            onChange={ e => onChange(e)}/>
        </div>
        <input type="submit" className="form-film-btn" />
      </form>
    </div>    
  )
};

FilmForm.propTypes = {
  addFilm: PropTypes.func.isRequired,
  getListFormat: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  list: state.films.list
});

export default connect(mapStateToProps, { addFilm, getListFormat })(FilmForm);
