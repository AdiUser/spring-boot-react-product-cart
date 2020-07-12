import React from 'react'
import ToolBar from './ToolBar'
import ProductGrid from './ProductGrid'
import '../Styles/Page.styles.css'
import Card from './Card'

class Page extends React.Component {

    render() {
        console.log('page', this.props.items)
        return(
            <div className='page'>
                <ToolBar />
                <div className='lower-page-wraper'>
                    <div className='left-view-page'></div>
                    <div className='right-view-page'>
                        <ProductGrid columns={4} gap={8}>
                            {this.props.items.map((key, i) => {
                                let height = 200 + Math.ceil(Math.random() * 300);
                                return <Card 
                                            height={height} 
                                            key={Math.random()}
                                            product={key}
                                            cartID={this.props.cartID}
                                            
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