import React from 'react'
import '../Styles/Card.styles.css'
import AddDeleteBtn from './AddDeleteBtn'
import AddToCartBtn from './AddToCartBtn'
import { T_ADD_PRODUCT } from '../Constants/Identifiers'
import { API_URL, GET_CART, ADD_TO_CART, REMOVE_FROM_CART } from '../Constants/Endpoints'
import { removeProduct, addProduct } from '../Utility/FetchCalls'

class Card extends React.Component {

    constructor(props) {
        super(props)

        this.markProductInCart = this.markProductInCart.bind(this)
        this.modifyProductInCart = this.modifyProductInCart.bind(this)
        this.state = {
            productID: this.props.product.id,
            isProductInCart: this.props.product.inCart,
            count: this.props.product.count
        }
    }

    markProductInCart() {
        // add product in cart and mark the new state
        console.log(ADD_TO_CART.replace('{cartID}', this.props.cartID))
        let addProductToCart = addProduct(this.props)
            .then(res => res.json())
            .then((result) => {
                if(result.error)
                    alert(result.error)
                else {
                    this.setState({
                        isProductInCart: true,
                        count: 1
                    })

                    this.props.updateCartIcon({
                        id: this.props.product.id,
                        count: 1,
                        price: this.props.product.price
                    });
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
            let addProductToCart = addProduct(this.props)
                .then(res => res.json())
                .then((result) => {
                    if (result.error)
                        alert(result.error)
                    else {
                        this.setState({
                            const: newCount
                        })

                        // send data for updating the cart icon in the 
                        // toolbar
                        this.props.updateCartIcon({
                            id: this.props.product.id,
                            count: 1,
                            price: this.props.product.price
                        });

                    }
                }, (error) => {
                    // handle api crash
                })
        }
        else {

            let removeProductFromCart = removeProduct(this.props)
                .then(res => res.json())
                .then((result) => {
                    if (result.error)
                        alert(result.error)
                    else {
                        console.log('deleted')
                        this.setState({
                            const: newCount
                        })
                        // send data for updating the cart icon in the 
                        // toolbar
                        this.props.updateCartIcon({
                            id: this.props.product.id,
                            count: -1,
                            price: this.props.product.price
                        });
                    }
                }, (error) => {
                    // handle api crash
                    console.log(error)
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
                    <div className='info btns'>
                        <div className='product-info'>
                            <div className='name'>{this.props.product.author}</div>
                            <div className='price'>${this.props.product.price}</div>
                        </div>
                        <div className='p-btns'>
                            { 
                                this.state.isProductInCart ? <AddDeleteBtn  
                                    productID = {this.props.product.id}
                                    count = {this.state.count}
                                    action = {this.modifyProductInCart}
                                /> : <AddToCartBtn  
                                        productID = {this.props.product.id}
                                        action = {this.markProductInCart}
                                />
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Card