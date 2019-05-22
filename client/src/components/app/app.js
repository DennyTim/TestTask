import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//Components
import { Navbar, Footer, Main } from '../layout';
import Films from '../films';
import Film from '../film';

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
            <Switch>
              <Route exact path="/" component={Main} />
              <Route exact path="/menu" component={Films} />
              <Route exact path="/film/:id" component={Film} />
            </Switch>
          <Footer />
        </Router>
      </Provider>
    )
  }
}