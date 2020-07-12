import React from 'react'
import Cookies from 'universal-cookie'
import Loader from './Components/Loader'
import Page from './Components/Page'
import { COOKIE_EXP_MINUTES } from './Constants/Identifiers'
import { fetchProducts, fetchCart } from './Utility/FetchCalls'

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)

    // find if the current user has active sessions saved in the 
    // cookies
    const cookie = new Cookies()
    let cartID = cookie.get('__cart')
    
    if(cartID === undefined) {

      // no previous session in active on client side
      // set __cartID for for cart API
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

      fetchProducts()
      .then(res => res.json())
      .then((result) => {

        // make call to get saved cart(if any)
        fetchCart(this.state.cartID) 
          .then(res => res.json())
          .then((cart) => {
            
            // mark products that are already present in the cart
            result.forEach((product, i) => {
              result[i].inCart = false
              result[i].price = (30 * Math.random()).toFixed(2)
              result[i].count = 0

              // images that come in the API are HUGE!!
              // so modify the image image size

              let imagesChunks = result[i].download_url.split('/')
              let n = imagesChunks.length
              imagesChunks[n - 1] = Math.floor((parseInt(imagesChunks[n - 1]) / 10)) % 200
              imagesChunks[n - 2] = Math.floor((parseInt(imagesChunks[n - 2]) / 10)) % 300

              result[i].download_url = imagesChunks.join("/")

              cart.forEach((cartProduct, j) => {
                if(cartProduct.id === product.id) {
                  result[i].inCart = true
                  result[i].count = cartProduct.count
                }
              })
            })

            this.setState({
              isLoaded: true,
              items: result,
              cart: cart
            })

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
          cart={this.state.cart}
          cartID={this.state.cartID}
          /> : <Loader />}
      </div>
    );
  }
}

export default App;
