import React from 'react'
import '../Styles/Card.styles.css'
import AddDeleteBtn from './AddDeleteBtn'
import AddToCartBtn from './AddToCartBtn'
import { T_ADD_PRODUCT } from '../Constants/Identifiers'

class Card extends React.Component {

    constructor(props) {
        super(props)
        this.markProductInCart = this.markProductInCart.bind(this)
        this.modifyProductInCart = this.modifyProductInCart.bind(this)
        this.state = {
            productID: this.props.product.id,
            isProductInCart: false,
            count: 0
        }
    }

    markProductInCart() {
        console.log('I am called')
        this.setState({
            isProductInCart: true,
            count: 1
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
                       {/*   */}
                       {this.state.isProductInCart ? <AddDeleteBtn  
                            productID = {this.state.productID}
                            count = {this.state.count}
                            action = {this.modifyProductInCart}
                        /> : <AddToCartBtn  
                                productID = {this.state.productID}
                                action = {this.markProductInCart}
                        />}
                    </div>
                </div>
            </div>
        )
    }
}

export default Card