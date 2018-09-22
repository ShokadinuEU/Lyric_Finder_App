import React, { Component } from 'react';
import axios from 'axios'

const Context = React.createContext();
const api_key = "5bf7b1efb458a73acaa6e441dc82b092";

export class Provider extends Component {
  state = {
    track_list: [],
    heading: 'Top 10 Tracks!'
  };
  componentDidMount() {
    axios.get(`https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/chart.tracks.get?page=1&page_size=10&country=it&f_has_lyrics=1&apikey=${api_key}
    `)
    .then(res => {
      // console.log(res.data);
      this.setState({track_list: res.data.message.body.track_list})
    })
    .catch(err => console.log(err));
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        { this.props.children }
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
