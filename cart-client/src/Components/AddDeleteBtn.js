import React from 'react'
import { T_ADD_PRODUCT, T_DELETE_PRODUCT } from '../Constants/Identifiers'


class AddDeleteBtn extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isProductSelected: this.props.isEnabled,
            count: this.props.count
        }
    }
    render() {
        return (
            <div className="add-detele-product">
                <button 
                    className = 'delete'
                    onClick = {this.props.action.bind(this, 1, T_DELETE_PRODUCT)}
                >
                &#45;
                </button>
                <span className='count'>
                    <span className='num'>
                        {this.props.count}
                    </span>
                </span>
                <button 
                    className='add'
                    onClick={this.props.action.bind(this, 1, T_ADD_PRODUCT)}
                >
                &#43;
                </button>
            </div>
        )
    }
}

export default AddDeleteBtn