import React from 'react'
import ToolBarButton from './ToolBarButton'
import ToolBarCartIcon from './ToolBarCartIcon'
import { LOGO_PATH } from '../Constants/Paths'
import '../Styles/ToolBar.styles.css'

class ToolBar extends React.Component {

    render() {
        console.log('tootlbar render')
        return (
            <header className = 'toolbar'>
                <div className = 'logo left'>
                    <img src = {LOGO_PATH}  className = 'brand-logo' alt = 'img'></img>
                </div>
                <div className = 'buttons right'>
                    <div className='icon'>
                        <ToolBarCartIcon
                            cart={this.props.cart}
                        />
                    </div>
                    <div className='l-r-btns'>
                        <ToolBarButton 
                            text = 'Login'
                        />
                        <ToolBarButton
                            text = 'Register'
                        />
                    </div>
                </div>
            </header>
        )
    }
}

export default ToolBar