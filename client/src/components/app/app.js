import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//Components
import { Navbar, Footer, Main, Alert } from '../layout';
import Films from '../films';
import Film from '../film';
import FilmForm from '../film-form';
import ImportFilms from '../import-films';
import NotFound from '../not-found/NotFound';

// Redux
import { Provider } from 'react-redux';
import store from '../../store';

//Others
import './app.css';
import './reset.css';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Navbar />
            <div className="absolute"><Alert /></div> 
            <Switch>
              <Route exact path="/" component={Main} />
              <Route exact path="/menu" component={Films} />
              <Route exact path="/film/:id" component={Film} />
              <Route exact path="/add" component={FilmForm} />
              <Route exact path="/import" component={ImportFilms} />
              <Route component={NotFound} />
            </Switch>
          <Footer />
        </Router>
      </Provider>
    )
  }
}