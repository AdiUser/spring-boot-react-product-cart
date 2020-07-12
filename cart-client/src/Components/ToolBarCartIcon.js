import React from 'react'
import { CART_ICON_PATH } from '../Constants/Paths'
class ToolBarCartIcon extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            showIcon: true,
            showPrice: false
        }
    }


    getProductsCount(cart) {
        console.log('icon component', this.props.cart)
        let total = 0
        cart.forEach(product => {
            total += product.count
        });

        return total
    }

    showTotalPrice(cart) {
        let total = 0;
        cart.forEach(product => {
            total += (product.count * product.price)
        })
    }

    render() {

        
        if(this.state.showIcon) {
            return (
                <div className='cart-icon'>
                    <img src={CART_ICON_PATH} onClick={this.showTotalPrice(this.props.cart)} alt='cart-icon' />
                    <span className='cart-count'>{this.getProductsCount(this.props.cart)}</span>
                </div>
            )
        }
        else {
            return <div></div>
        }
    }
}

export default ToolBarCartIcon