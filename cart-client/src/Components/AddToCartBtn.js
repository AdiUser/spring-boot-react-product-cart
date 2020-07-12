import React from 'react'

class AddToCartBtn extends React.Component {

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