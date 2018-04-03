import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUser } from './actions/auth';

//import '../style.css';

import Header from './components/header';
import NewRating from './components/new_rating';
import Ratings from './components/ratings';
import Albums from './components/albums';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container-full">
          <Header />
          <div className="container-body">
            <Switch>
              <Route path="/" exact component={Ratings} />    
              <Route path="/rating/new" component={NewRating} />  
              <Route path="/ratings" component={Ratings} />
              <Route path="/albums" component={Albums} />    
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

// all actions get assigned to component as props ***
export default connect(null, { fetchUser })(App);
