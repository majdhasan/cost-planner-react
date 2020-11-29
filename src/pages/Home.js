import React, { Component } from 'react'

import { FloatingButton } from '../components'

class Home extends Component {
    render() {
        return (
            <div>
                <h1>Home</h1>
                <FloatingButton onClick={() =>{console.log("button is working");}} content={<i className="fa fa-plus"></i>}></FloatingButton>
            </div>
        )
    }
}

export { Home }
