import React from 'react'

class ToolBarButton extends React.Component {

    render() {
        return(
            <button className = 'toolbar-btn' > 
                {this.props.text} 
            </button>
        )
    }
}

export default ToolBarButton