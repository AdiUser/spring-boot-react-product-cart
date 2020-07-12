import React from 'react'
import { T_ADD_PRODUCT, T_DELETE_PRODUCT} from '../Constants/Identifiers'

class AddToCartBtn extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isProductInCart: false
        }
    }
    render() {
        return(
            <div 
                className='add-to-cart'
                onClick={this.props.action.bind(this)}
            >
                <span>&#43;</span> Add to cart
            </div>
        )
    }
}

export default AddToCartBtn