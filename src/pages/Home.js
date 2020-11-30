import React, { Component } from 'react'

import { FloatingButton, AddForm } from '../components'


class Home extends Component {
    render() {
        return (
            <div>
                <h1>Home</h1>
                <AddForm />
            </div>
        )
    }
}

export { Home }
