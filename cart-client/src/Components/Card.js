import React from 'react'
import '../Styles/Card.styles.css'
import AddDeleteBtn from './AddDeleteBtn'
import AddToCartBtn from './AddToCartBtn'
import { T_ADD_PRODUCT } from '../Constants/Identifiers'
import { API_URL, GET_CART, ADD_TO_CART, REMOVE_FROM_CART } from '../Constants/Endpoints'


class Card extends React.Component {

    constructor(props) {
        super(props)
        console.log(this.props)

        this.markProductInCart = this.markProductInCart.bind(this)
        this.modifyProductInCart = this.modifyProductInCart.bind(this)
        this.state = {
            productID: this.props.product.id,
            isProductInCart: this.props.product.inCart,
            count: this.props.product.count
        }
    }

    markProductInCart() {
        console.log('I am called')
        // add product in cart and mark the new state
        console.log(ADD_TO_CART.replace('{cartID}', this.props.cartID))
        fetch(ADD_TO_CART.replace('{cartID}', this.props.cartID), {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: this.props.product.id,
                count: 1, 
                price: this.props.product.price
            }),
        }).then(res => res.json())
            .then((result) => {
                console.log(result);
                if(result.error)
                    alert(result.error)
                else {
                    this.setState({
                        isProductInCart: true,
                        count: 1
                    })
                }
                
            }, (error) => {
                // handle api crash
            })

        
    }

    modifyProductInCart(items, type) {

        let newCount = type === T_ADD_PRODUCT ? this.state.count + items : this.state.count - items
        
        // if item count is zero or less, remove that product from the cart
        // and show add-to-cart button on that product's card
        if(newCount <= 0) {
            this.setState({
                isProductInCart: false
            })
        }

        if(type === T_ADD_PRODUCT) {
            fetch(ADD_TO_CART.replace('{cartID}', this.props.cartID), {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: this.props.product.id,
                    count: 1,
                    price: this.props.product.price
                }),
            }).then(res => res.json())
                .then((result) => {
                    console.log(result);
                    if (result.error)
                        alert(result.error)
                    else {
                        this.setState({
                            const: newCount
                        })
                    }
                }, (error) => {
                    // handle api crash
                })
        }
        else {

            let url = REMOVE_FROM_CART.replace('{cartID}', this.props.cartID).replace('{productID}', this.state.productID)
            fetch(url, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: this.props.product.id,
                    count: 1,
                    price: this.props.product.price
                }),
            }).then(res => res.json())
                .then((result) => {
                    console.log(result);
                    if (result.error)
                        alert(result.error)
                }, (error) => {
                    // handle api crash
                })
        }
        // update new product count
        this.setState({
            count: newCount
        })
    }

    render() {
        return (
            <div className='card' style={{
                height: `${this.props.height}px`,
                border: '1px solid'
            }}>
                <div className='card-wrap'>
                    <div className='img'>
                        <img className='product-img' src={this.props.product.download_url+'.webp'} alt='product-images' />
                    </div>
                    <div className='btns'>
                       {this.state.isProductInCart ? <AddDeleteBtn  
                            productID = {this.props.product.id}
                            count = {this.state.count}
                            action = {this.modifyProductInCart}
                        /> : <AddToCartBtn  
                                productID = {this.props.product.id}
                                action = {this.markProductInCart}
                        />}
                    </div>
                </div>
            </div>
        )
    }
}

export default Card