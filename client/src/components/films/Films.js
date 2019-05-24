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
      fieldOfSearch: 'title'
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
      this.setState({
        displayedfilms: films
      })
    }
  
    handleTitle = e => {
      let searchQuery = e.target.value.toLowerCase();
      let displayedfilms = this.props.films.filter(function(el) {
        let searchValue = el.title.toLowerCase()
        return searchValue.indexOf(searchQuery) !== -1;
      });
      console.log(displayedfilms);
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
      const { displayedfilms, fieldOfSearch } = this.state;
      
      return (!displayedfilms) ? <Spinner /> : (
        <div className="container">
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
