import React, { Component } from 'react';
import RatingForm from './rating_form';
import { connect } from 'react-redux';
import { saveRating } from '../actions/ratings';
import SignIn from './sign_in.js';

class NewRating extends Component {
  constructor(props) {
    super(props);

    this.submitRating = this.submitRating.bind(this);
  }

  submitRating(values) {
    values.faveSongs = values.faveSongs.filter(x => !!x);
    this.props.saveRating(values, (err, res) => {
      if (err) {
        this.props.history.push('/ratings');
      } else {
        this.props.history.push(`/ratings`);
      }
    });
  }

  render() {
    if (!this.props.user) {
      return (<SignIn/>);
    }

    const result = (
      <div className="card new-rating-card">
        <div className="card-header"><h4>New Rating</h4></div>
        <div className="card-body">
          <RatingForm onSubmit={this.submitRating} readyValues={this.props.readyValues}/>
        </div>
      </div>
    );
    
    return result;
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    readyValues: state.readyValues,
  };
}

export default connect(mapStateToProps, { saveRating })(NewRating);