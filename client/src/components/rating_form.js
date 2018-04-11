import React, { Component } from 'react';
import { reduxForm, Field, FieldArray, change } from 'redux-form';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import Rating from 'react-rating';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

class RatingForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listenDate: moment()
    };

    this.handleDateChange = this.handleDateChange.bind(this);
    this.renderDatePicker = this.renderDatePicker.bind(this);
    this.handleRatingChange = this.handleRatingChange.bind(this);
    this.renderRating = this.renderRating.bind(this);
    this.renderSongs = this.renderSongs.bind(this);
    this.renderTextField = this.renderTextField.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(change('ratingForm', 'rating', 5));
    this.props.dispatch(change('ratingForm', 'listenDate', moment()));
  }

  handleDateChange(date) {
    this.setState({
      listenDate: date,
    });
    this.props.dispatch(change('ratingForm', 'listenDate', date));
  }

  handleRatingChange(val) {
    if (val) {
      this.props.dispatch(change('ratingForm', 'rating', val));
    }
    
  }

  renderDatePicker({input, myVal, placeholder, defaultValue, meta: {touched, error} }) {
    return (
      <div>
        <DatePicker
          selected={myVal}
          onChange={this.handleDateChange}
          dateFormat="LL"
          className="form-control"
        />
        <div className="error-message">
          {touched && error}
        </div>
      </div>
    );
  }

  renderRating(props) {
    return (
      <div>
        <Rating 
          stop={10}
          onChange={this.handleRatingChange}
          initialRating={5}
        />
      </div>
    );
  }

  renderSongs(props) {
    const { fields } = props;
    return (
      <ul className="list-group">
        {fields.map((song, index) => (
          <li key={index} className="list-group-item">
            <div className="input-group mb-3">
              <Field
                name={song}
                component="input"
                className="form-control"
                label={`Song #${index + 1}`}
                maxLength={50}
              />
              <div className="input-group-append">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => fields.remove(index)}
                >
                Remove
                </button>
              </div>
            </div>
          </li>
        ))}
        <li className="list-group-item">
          <button 
            type="button" 
            onClick={() => fields.push()}
            className="btn btn-success"
          >
            Add Song
          </button>
        </li>
        {/*{error && <li className="error">{error}</li>}*/}
      </ul>
    );
  }

  renderTextField(props) {
    const { input, meta: {touched, error } } = props;
    return (
      <div>
        <input {...input} className='form-control' maxLength={100}/>
        <div className="error-message">
          {touched && error}
        </div>
      </div>
    );
  }

  render() {
    const { pristine, submitSucceeded, handleSubmit } = this.props

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Album Name</label>
            <Field
              name="name"
              component={this.renderTextField}
            />
          </div>
          <div className="form-group">
            <label>Artist</label>
            <Field
              name="artist"
              component={this.renderTextField}
            />
          </div>
          <div className="form-group">
            <label>Date</label>
            <Field
              name="listenDate"
              component={this.renderDatePicker}
              className="form-control"
              myVal={this.state.listenDate}
            />
          </div>
          <div className="form-group">
            <label>Rating</label>
            <Field
              name="ratingDisplay"
              component={this.renderRating}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Comments</label>
            <Field
              name="comments"
              component="textarea"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Fave Songs</label>
            <FieldArray name="faveSongs" component={this.renderSongs} />
          </div>
          <br/>
          <button type="submit" disabled={pristine || submitSucceeded} className="btn btn-primary">Submit</button>
        </form>
      </div>
    )
  }
}

function validate(values) {
  const errors = {};
  if (!values.name) {
    errors.name = 'Album name is required';
  }
  if (!values.artist) {
    errors.artist = 'Artist is required';
  }
  if (!values.listenDate || !moment(values.listenDate).isValid()) {
    errors.listenDate = 'Invalid date';
  }
  return errors;
}


RatingForm = reduxForm({
  validate,
  form: 'ratingForm'
}
)(RatingForm)

// You have to connect() to any reducers that you wish to connect to yourself
RatingForm = connect(
  state => ({
    initialValues: state.readyValues // pull initial values from account reducer
  })
)(RatingForm)

export default RatingForm;