import * as React from 'react';
import {
    Navbar,
    Nav,
    NavItem,
    NavLink,} from 'reactstrap';
import {NavLink as RouterLink} from 'react-router-dom';

class Footer extends React.PureComponent<{},{}>{
    render(){
        return(
            <Navbar color="dark" dark expand="md">    
                <Nav navbar>
                    <NavItem>
                        <RouterLink className="nav-link" to="/">Link</RouterLink>
                        <RouterLink className="nav-link" to="/">Link</RouterLink>
                        <RouterLink className="nav-link" to="/">Link</RouterLink>
                    </NavItem>
                    <NavItem>
                        <RouterLink className="nav-link" to="/">Link</RouterLink>
                    </NavItem>
                    <NavItem>
                        <RouterLink className="nav-link" to="/">Link</RouterLink>
                    </NavItem>
                    <NavItem>
                        <RouterLink className="nav-link" to="/">Link</RouterLink>
                    </NavItem>
                </Nav>
            </Navbar>
        );
    }
}

export default Footer;