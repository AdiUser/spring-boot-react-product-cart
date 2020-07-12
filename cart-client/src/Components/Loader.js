import React from 'react'
import {LOADER_PATH} from '../Constants/Paths'

class Loader extends React.Component {

    render() {
        return (
            <div className = 'loader'>
                <img src = {LOADER_PATH} alt = 'loader' className = 'centered' />
            </div>
        )
    }
}

export default Loader