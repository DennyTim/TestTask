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
    state = {
      displayedfilms: null,
      fieldOfSearch: 'title',
      sortMode: 'Alphabet a-z' 
    }
  
    componentDidMount() {
      this.props.getFilms();
    }
    
    componentDidUpdate(prevProps) {
      if (this.props.films !== prevProps.films) {
        this.updateList()
      }
    }
    
    updateList() {
      const { films } = this.props;
      const { sortMode } = this.state;
      let sortFilms = this.sorting(films, sortMode);
      this.setState({
        displayedfilms: sortFilms
      })
    }

    dropdown(e) {
      let items = [...document.querySelectorAll('.sort-elem')];
      items.forEach((item) => item.classList.toggle('item-active'));
    }

    sorting(films, sortMode) {
      switch(sortMode) {
        case 'Alphabet a-z':
          return films.sort(function(a, b) {
            let textA = a.title.toUpperCase();
            let textB = b.title.toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
          })
        case 'Alphabet z-a':
          return films.sort(function(a, b) {
            let textA = a.title.toUpperCase();
            let textB = b.title.toUpperCase();
            return (textA < textB) ? 1 : (textA > textB) ? -1 : 0;
          })
        default:
          return 'Alphabet a-z';
      }
    }

    setSortMode(e) {
      const { displayedfilms } = this.state;
      this.setState({
        sortMode: e.target.textContent,
        displayedfilms: this.sorting(displayedfilms, e.target.textContent)
      })
      this.dropdown(e);
    }
  
    handleTitle = e => {
      let searchQuery = e.target.value.toLowerCase();
      let displayedfilms = this.props.films.filter(function(el) {
        let searchValue = el.title.toLowerCase()
        return searchValue.indexOf(searchQuery) !== -1;
      });
      this.setState({
        displayedfilms: displayedfilms
      })
    };

    handleUser = (e) => {
      let searchQuery = e.target.value.toLowerCase();
      let displayedfilms = this.props.films.filter(function(el) {
        return el.starlist.some(function(item) {
          let searchValue = item.toLowerCase();
          return searchValue.indexOf(searchQuery) !== -1;
        })
      });

      this.setState({
        displayedfilms: displayedfilms
      })
    }

    onClick = e => {
      let elem = document.querySelectorAll('.fas');
      [...elem].map(item => item.classList.remove("fas-active"));
      e.target.classList.toggle("fas-active");
      if(e.target.classList.contains('fa-user')) {
        this.setState({
          fieldOfSearch: 'user'
        });
      } else {
        this.setState({
          fieldOfSearch: 'title'
        })
      }
    }
  
    render() {
      const { displayedfilms, fieldOfSearch, sortMode } = this.state;
      
      return (!displayedfilms) ? <Spinner /> : (
        <div className="container">
          <div className="top">
            <div className="dropdown-menu">
              <div className="sort-field" onClick={(e) => this.dropdown(e)}>{sortMode}</div>
              <ul className="sort-items" onClick={(e) => this.setSortMode(e)}>
                <li className="sort-elem">Alphabet a-z</li>
                <li className="sort-elem">Alphabet z-a</li>
              </ul>
            </div>
            <div className="search"> 
              <div className="search-block">
                <input className="search-input" 
                        type="search" 
                        placeholder="Search" 
                        onChange={e => (fieldOfSearch === 'title') ? this.handleTitle(e) : this.handleUser(e)}/>
                <div className="icon"></div>
              </div>
              <div className="settings-icon">
                <i className="fas fa-heading fas-active" onClick={e => this.onClick(e)}></i>
                <i className="fas fa-user" onClick={e => this.onClick(e)}></i>
              </div>
            </div>
          </div>
          <ul className="block-films">
            { displayedfilms.length > 0 ?
              displayedfilms.map(function(el) {
                return <FilmItem key={el.uid} films={el}/>;
              }) :
              (<div className="empty-title">Empty list</div>)
            }
          </ul>
        </div>
      )
    }
};

const mapStateToProps = state => ({
  films: state.films.films
});

export default connect(mapStateToProps, { getFilms })(Films);
