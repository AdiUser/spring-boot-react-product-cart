import React, { Component } from 'react'
import ToolBar from './Components/ToolBar'
import { API_URL } from './Constants/Endpoints'
import Loader from './Components/Loader'
import ProductGrid from './Components/ProductGrid'
import Page from './Components/Page'
import { LOADER_PATH } from './Constants/Paths'

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    // make API call to fetch the list of prducts
    fetch(API_URL)
      .then(res => res.json())
      .then((result) => {
        this.setState({
          isLoaded: true,
          items: result
        })
      }, (error) => {
        this.setState({
          error: error
        })
      })
  }

  render () {
    return (
      <div className="App">
        {this.state.isLoaded ? <Page items={this.state.items}/> : <Loader />}
      </div>
    );
  }
}

export default App;
