import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import NoMatch from './views/nomatch';
import Search from './views/search';
import List from './views/list';
import Book from './views/book';
import Chapter from './views/chapter/Chapter';

import store from './redux/store';

class App extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount () {
    console.log(store.getState());
  }
  render () {
    return (
      <Router>
        <Switch>
          <Route path="/" component={Search} exact  />
          <Route path="/search" component={Search}  />
          <Route path="/list" component={List}  />
          <Route path="/book/:id" component={Book} />
          <Route path="/chapter/:link" component={Chapter} />
          <Route component={NoMatch}  />
        </Switch>
      </Router>
    )
  }
}

export default App;