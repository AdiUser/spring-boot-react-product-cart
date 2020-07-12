import React from 'react'
import { CART_ICON_PATH } from '../Constants/Paths'
class ToolBarCartIcon extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            showIcon: true
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

    render() {

        
        if(this.state.showIcon) {
            return (
                <div className='cart-icon'>
                    <img src={CART_ICON_PATH} alt='cart-icon' />
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