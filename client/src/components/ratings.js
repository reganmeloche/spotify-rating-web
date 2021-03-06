import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRatings, deleteRating } from '../actions/ratings';
import moment from 'moment';

import SignIn from './sign_in';

import Rating from 'react-rating';
import ReactTable from "react-table";
import "react-table/react-table.css";

class Ratings extends Component {
  constructor(props) {
    super(props);

    this.callDeleteRating = this.callDeleteRating.bind(this);
  }

  callDeleteRating(ratingId) {
    this.props.deleteRating(ratingId, () => {
      this.props.fetchRatings();
    });
  }

  componentDidMount() {
    this.props.fetchRatings();
  }

  render() {
    if (this.props.user === null) {
      return null;
    } else if (this.props.user === false) {
      return (<SignIn/>);
    }
    

    let result = <div>loading ratings...</div>
    if (this.props.ratings) {
      result = (
        <div>
          <ReactTable
            data={this.props.ratings}
            columns={[
            {
              Header: <div class="my-left-align">Album</div>,
              accessor: "albumName"
            },
            {
              Header: <div class="my-left-align">Artist</div>,
              accessor: "artist"
            },
            {
              Header: <div class="my-left-align">Listen Date</div>,
              accessor: "listenDate",
              Cell: row => (
                <div>
                  {moment(row.value).format('LL')}
                </div>
              )
            },
            {
              Header: "Rating",
              accessor: "rating",
              Cell: row => (
                <div class="my-center-align">
                  <Rating
                    readonly={true}
                    initialRating={row.value/2}
                    emptySymbol="fa fa-star-o fa-2x"
                    fullSymbol="fa fa-star fa-2x"
                    fractions={2}
                  />
                </div>
              )
            },
            {
              expander: true,
              Header: () => <span>More</span>,
              width: 65,
              Expander: ({ isExpanded, ...rest }) =>
                <div>
                  {isExpanded
                    ? <span>&#x2299;</span>
                    : <span>&#x2295;</span>}
                </div>,
              style: {
                cursor: "pointer",
                fontSize: 25,
                padding: "0",
                textAlign: "center",
                userSelect: "none"
              },
              Footer: () => <span>&hearts;</span>
            },
            {
              Header: "Delete",
              Cell: (x) => (
                <div class="my-center-align">
                  <button 
                    type="button" 
                    className="btn btn-danger"
                    onClick={() => this.callDeleteRating(x.original.ratingId)}
                  >
                    Delete
                  </button>
                </div>
              )
            }
          ]}
            defaultPageSize={20}
            className="-striped -highlight"
            SubComponent={(x) => 
              <div style={{padding: '10px'}}>
                <div>
                  <strong>Comments:</strong> {x.original.comments}
                </div>
                <br/>
                <div>
                  <strong>Fave Songs:</strong> {x.original.faveSongs.join(', ')}
                </div>
              </div>}
          />
          <br />
        </div>
      );
    }
    return result;
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    ratings: state.ratings,
  };
}

export default connect(mapStateToProps, { fetchRatings, deleteRating })(Ratings);
