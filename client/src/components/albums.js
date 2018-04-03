import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAlbums, ratingFromAlbum } from '../actions/albums';

import SignIn from './sign_in.js';

import ReactTable from "react-table";
import "react-table/react-table.css";

class Albums extends Component {
  constructor(props) {
    super(props);
    this.callRatingFromAlbum = this.callRatingFromAlbum.bind(this);
  }

  callRatingFromAlbum(data) {
    console.log('calling', data);
    this.props.ratingFromAlbum(data);
    console.log('SET!');
    this.props.history.push('/rating/new');
  }

  componentDidMount() {
    this.props.fetchAlbums();
  }

  render() {
    if (!this.props.user) {
      return (<SignIn/>);
    }
    let result = <div>loading albums...</div>
    if (this.props.albums) {
      result = (
        <div>
          <ReactTable
            data={this.props.albums}
            columns={[
            {
              Header: "Album",
              accessor: "name"
            },
            {
              Header: "Label",
              accessor: "label"
            },
            {
              Header: "Artist",
              accessor: "artists"
            },
            {
              Header: "Date",
              accessor: "addedAt"
            },
            {
              Header: "New Rating",
              Cell: (x) => (
                <span>
                  <button 
                    type="button" 
                    className="btn btn-success"
                    onClick={() => this.callRatingFromAlbum(x.original)}
                  >
                    Add Rating
                  </button>
                </span>
              )
            }
          ]}
            defaultPageSize={20}
            className="-striped -highlight"
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
    albums: state.albums,
  };
}

export default connect(mapStateToProps, { fetchAlbums, ratingFromAlbum })(Albums);
