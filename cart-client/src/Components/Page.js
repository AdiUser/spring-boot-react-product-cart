import React from 'react'
import ToolBar from './ToolBar'
import ProductGrid from './ProductGrid'
import '../Styles/Page.styles.css'
import Card from './Card'
import { LOGO_BIG } from '../Constants/Paths'
import { DEMO_TEXT } from '../Constants/Identifiers'

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
        let cart = this.state.cart
        let isUpdated = false;
        cart.forEach((cartProduct, i) => {
            if (cartProduct.id === product.id) {
                cart[i].count += product.count

                if(cart[i].count < 0) 
                    cart[i].count = 0
                isUpdated = true
                return true
            }
        });

        if(!isUpdated)
            cart.push(product)
        
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
                    <div className='left-view-page'>
                        <div className="title-wraper">
                            <div className="brand">
                                <div className="logo">
                                    <img src={ LOGO_BIG } alt=""/>
                                </div>
                                <div className="text">
                                    bazinga
                                </div>
                            </div>
                            <div className="desc-text">
                                { DEMO_TEXT }
                            </div>
                        </div>
                    </div>
                    <div className='right-view-page'>
                        {/* change `columns` to change number of columns in the product grid */}
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