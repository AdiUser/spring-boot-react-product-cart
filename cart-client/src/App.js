import React, { Component } from 'react'
import Cookies from 'universal-cookie'
import ToolBar from './Components/ToolBar'
import { API_URL, GET_CART } from './Constants/Endpoints'
import Loader from './Components/Loader'
import ProductGrid from './Components/ProductGrid'
import Page from './Components/Page'
import { LOADER_PATH } from './Constants/Paths'
import { COOKIE_EXP_MINUTES } from './Constants/Identifiers';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)

    // find if the current use has active sessions saved in the 
    // cookies
    const cookie = new Cookies()
    let cartID = cookie.get('__cart')
    
    if(cartID === undefined) {

      // no previous session in active on client side
      // set __cart_id for for cart API
      let expDate = new Date()
      expDate.setTime(expDate.getTime() + (COOKIE_EXP_MINUTES * 60 * 100))
      cartID = Math.random().toString(36).substring(2, 15);
      cookie.set('__cart', cartID)
    }
    else {
      // check is there are any products in the existing cart
      
    }
    
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      cartID: cartID
    };

  }

  componentDidMount() {
    // make API call to fetch the list of prducts
    fetch(API_URL).then(res => res.json())
      .then((result) => {

        // make call to get saved cart(if any)
        console.log(GET_CART.replace('{cartID}', this.state.cartID));
        fetch(GET_CART.replace('{cartID}', this.state.cartID), {
            credentials: 'include',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            }
        }).then(res => res.json())
          .then((cart) => {
            
            // mark products that are already present in the cart
            result.forEach((product, i) => {
              result[i].inCart = false
              result[i].price = 30 * Math.random()
              result[i].count = 0

              cart.forEach((cartProduct, j) => {
                console.log(cartProduct.id, product.id, cartProduct.id === product.id)
                if(cartProduct.id === product.id) {
                  result[i].inCart = true
                  result[i].count = cartProduct.count
                  console.log(result[i].count)
                }
              })
            })

            this.setState({
              isLoaded: true,
              items: result
            })

            console.log("first call", cart, result)

          }, (error) => {
            // handle API crash
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
        {this.state.isLoaded ? <Page 
          items={this.state.items}
          cartID={this.state.cartID}
          /> : <Loader />}
      </div>
    );
  }
}

export default App;
