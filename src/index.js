import React from 'react';
import ReactDOM from 'react-dom';
import { Route, NavLink ,BrowserRouter as Router, Switch } from 'react-router-dom'
import { Provider } from 'react-redux';
import App from './components/app';
import Favorites from './components/favorites';
import ToWatch from './components/to-watch';
import Notfound from './components/page-404';
import store from './store';
import './css/all.min.css';
import './css/fontawesome.min.css';
import './scss/App.scss';

const Routing = () => (
  <Router>
    <nav>
      <ul>
        <li><NavLink exact to="/" activeClassName="active">Search</NavLink></li>
        <li><NavLink to="/favorites" activeClassName="active">Favorites</NavLink></li>
        <li><NavLink to="/towatch" activeClassName="active">To Watch</NavLink></li>
      </ul>
    </nav>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/favorites" component={Favorites} />
      <Route path="/towatch" component={ToWatch} />
      <Route component={Notfound} />
    </Switch>
  </Router>
)

ReactDOM.render(
  <Provider store={store}>
    <Routing />
  </Provider>
  , document.getElementById('root'));
