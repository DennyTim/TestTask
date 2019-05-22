//React
import React, { useEffect } from 'react';

//Redux
import { connect } from 'react-redux';
import { getFilms } from '../../actions/films';

const Films = ({ getFilms, films: { films } }) => {

  useEffect(() => {
    getFilms();
  }, [getFilms]);

  return (
    <ul className="films">
      {films.map(item => (
        <li key={item._id}>{item.title}</li>
      ))}
    </ul>
  )
}

const mapStateToProps = state => ({
  films: state.films
})

export default connect(mapStateToProps, { getFilms })(Films);
