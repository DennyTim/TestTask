import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addFilm, getListFormat } from '../../actions/films';
import './film-form.css';

const FilmForm = ({ addFilm, getListFormat, history, list, error: { alert } }) => {

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
      <h1 className="form-title">Add New Film</h1>
       {alert.length > 0 && 
        alert[0].msg.map((item, index) => <div className="alert" key={index}>{item.msg}</div>)}
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
          <p className="form-film-format" onChange={ e => onChange(e)}
              onClick={() => toggledList(!menuList)}>{format}</p>
          <ul>
          {
            menuList ? 
              list.map((item, index) => 
                <li className="form-film-format" onClick={e => {
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
            {/* {error && (<div className="invalid-feedback">{error}</div>)} */}
        </div>
        <div className="form-film-item">
          <input 
            type="text" 
            placeholder="Stars" 
            name="stars" 
            value={stars}
            onChange={ e => onChange(e)}/>
            {/* {error && (<div className="invalid-feedback">{error}</div>)} */}
        </div>
        <div className="form-film-item">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Create a post"
            value={description}
            onChange={ e => onChange(e)}
            >
          </textarea>
          {/* {error && (<div className="invalid-feedback">{error}</div>)} */}
        </div>
        <input type="submit" className="form-film-btn" />
      </form>
      <Link to="/menu" className="form-link">Back</Link>
    </div>    
  )
};

FilmForm.propTypes = {
  addFilm: PropTypes.func.isRequired,
  getListFormat: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  list: state.films.list,
  error: state
});

export default connect(mapStateToProps, { addFilm, getListFormat })(FilmForm);
