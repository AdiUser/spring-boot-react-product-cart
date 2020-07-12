import React from 'react'
import ToolBar from './ToolBar'
import ProductGrid from './ProductGrid'
import '../Styles/Page.styles.css'
import Card from './Card'

class Page extends React.Component {

    constructor(props) {
        super(props)
        this.updateCartIcon = this.updateCartIcon.bind(this)
        this.state = {
            cart: this.props.cart,
            products: this.props.items
        }
    }

    updateCartIcon(product) {

        // find the product in current state and 
        // update it with our newly recieved product state
        console.log("I got called")
        let cart = this.state.cart

        console.log('before', cart)

        let isUpdated = false;
        cart.forEach((cartProduct, i) => {
            console.log(cartProduct.id, product.id)
            if (cartProduct.id == product.id) {
                cart[i].count += product.count

                if(cart[i].count < 0) 
                    cart[i].count = 0
                isUpdated = true
                return true
            }
        });

        if(!isUpdated)
            cart.push(product)
        
        console.log('after', cart)
        this.setState({
            cart: cart
        })
    }

    render() {
        return(
            <div className='page'>
                <ToolBar 
                    cart={this.state.cart}
                />
                <div className='lower-page-wraper'>
                    <div className='left-view-page'></div>
                    <div className='right-view-page'>
                        <ProductGrid columns={4} gap={8}>
                            {this.state.products.map((key, i) => {
                                let height = 200 + Math.ceil(Math.random() * 300);
                                return <Card 
                                            height={height} 
                                            key={Math.random()}
                                            product={key}
                                            cartID={this.props.cartID}
                                            updateCartIcon={this.updateCartIcon.bind(this)}
                                            
                                        />
                            })}
                        </ProductGrid>
                    </div>
                </div>
            </div>
        )
    }
}

export default Page