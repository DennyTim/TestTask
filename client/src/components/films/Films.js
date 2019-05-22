//React
import React, { Component } from 'react';

//Components
import FilmItem from '../film-item';
import Spinner from '../spinner';

//Redux
import { connect } from 'react-redux';
import { getFilms } from '../../actions/films';

import './films.css';

class Films extends Component {

  componentDidMount() {
    this.props.getFilms();
  }

  render () {

    const { films: { films, loading } } = this.props;
    return loading ? <Spinner /> : (
      <div className="container">
        <ul className="films">
          {films.map(item => (
            <FilmItem key={item.uid} films={item} />
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  films: state.films
});

export default connect(mapStateToProps, { getFilms })(Films);
