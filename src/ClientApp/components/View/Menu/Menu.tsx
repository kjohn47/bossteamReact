import * as React from 'react';
import Blogs from './Blogs';
import Sales from './Sales';
import Tours from './Tours';
import UserMenu from './UserMenu';
import LoginForm from './LoginForm';
import loginLogic from '../../Logic/Common/LoginLogic';
import Events from './Events';
import Language from './Language';
import {ImenuProps, ImenuState} from "../../../interfaces/menu";

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink} from 'reactstrap';

import {NavLink as RouterLink} from 'react-router-dom';

const InlineLogin = loginLogic( LoginForm, UserMenu );

class MenuView extends React.Component<ImenuProps,ImenuState>{
    constructor(props:any) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }

    toggle() {
        this.setState(
            {
                isOpen: !this.state.isOpen
            });
      }
    
    render(){
        let loggedin = this.props.isLogged;
        const menuText = this.props.menuText;
        return(
            <Navbar color="dark" dark expand= {loggedin ? "md": "lg"}>
                <RouterLink className="navbar-brand" to="/">BossTeam</RouterLink>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav navbar>
                        <NavItem>
                            <NavLink />
                        </NavItem>
                        <NavItem>
                            <RouterLink className="nav-link" to="/news">{menuText.newsTitle}</RouterLink>
                        </NavItem>
                        <NavItem>
                            <NavLink />
                        </NavItem>
                        {loggedin ? 
                            <Blogs blogsText = {menuText.blogs} user = {this.props.currentUsr}/>
                        : ""}                        
                        {loggedin ? 
                            <NavItem> 
                                <NavLink />
                            </NavItem>
                        : ""}
                        {loggedin ? 
                            <Sales salesText = {menuText.sales} user = {this.props.currentUsr}/>
                        : ""}                     
                        {loggedin ? 
                            <NavItem>
                                <NavLink />
                            </NavItem> 
                        : ""}
                        {loggedin ? 
                            <Events eventsText = {menuText.events} user = {this.props.currentUsr}/> 
                        : ""}    
                        {loggedin ?
                            <NavItem>
                                <NavLink />
                            </NavItem> 
                        : ""}
                        {loggedin ? 
                            <Tours toursText = {menuText.tours} user = {this.props.currentUsr}/>
                        : ""}    
                    </Nav>
                    <Nav navbar  className="ml-auto">
                        <Language languageText = {menuText.language} appGetLanguage = {this.props.appGetLanguage}/>
                        <NavItem>
                            <NavLink />
                        </NavItem>
                        <InlineLogin />
                    </Nav>
                </Collapse>
            </Navbar>
        );
    }
}

export default MenuView;