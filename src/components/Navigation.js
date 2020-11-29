import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logUserOut } from '../actions'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';

class NavigationComponent extends Component {

    constructor(props) {
        super(props)

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
        }
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    _renderLoginOrLogout() {
        const { isAuth, logUserOut, profile } = this.props;
        if (isAuth) {
            return (
                <div>
                    <NavItem>
                        <NavLink>Welcome, {profile.name}</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink onClick={() => (logUserOut())}>Logout</NavLink>
                    </NavItem>
                </div>
            )
        } else {
            return (
                <NavItem>
                    <NavLink href="/login/">Login</NavLink>
                </NavItem>
            )
        }
    }

    render() {
        const { profile } = this.props;
        return (
            <div>
                <Navbar color="dark" dark expand="md">
                    <NavbarBrand href="/">Cost Planner</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            {this._renderLoginOrLogout()}
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}
const mapStateToProps = ({ auth }) => {
    return {
        isAuth: auth.isAuth,
        profile: auth.profile
    };
};

const Navigation = connect(mapStateToProps, { logUserOut })(NavigationComponent)
export { Navigation };