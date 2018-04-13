import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
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
    this.props.ratingFromAlbum(data);
    this.props.history.push('/rating/new');
  }

  componentDidMount() {
    this.props.fetchAlbums();
  }

  render() {
    if (this.props.user === null) {
      return null;
    } else if (this.props.user === false) {
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
              Header: <div className="my-left-align">Album</div>,
              accessor: "name"
            },
            {
              Header: <div className="my-left-align">Label</div>,
              accessor: "label"
            },
            {
              Header: <div className="my-left-align">Artist(s)</div>,
              accessor: "artists",
              Cell: row => (
                <div>
                  {row.value.join(', ')}
                </div>
              )
            },
            {
              Header: <div className="my-left-align">Add Date</div>,
              accessor: "addedAt",
              Cell: row => (
                <div>
                  {moment(row.value).format('LL')}
                </div>
              )
            },
            {
              Header: "New Rating",
              Cell: (x) => (
                <div className="my-center-align">
                  <button 
                    type="button" 
                    className="btn btn-success"
                    onClick={() => this.callRatingFromAlbum(x.original)}
                  >
                    Add Rating
                  </button>
                </div>
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
