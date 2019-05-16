import * as React from 'react';
import {NavItem, NavLink, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import {ILogin} from '../../../interfaces/login';
import {NavLink as RouterLink} from 'react-router-dom';

class LoginForm extends React.PureComponent<ILogin,{}>{
    render(){
        const loginText = this.props.loginText;
        return (
            <Form inline>
                <FormGroup  className="mb-2 mr-sm-2 mb-sm-0">
                    <Input type="text" name="user" id="user" placeholder={loginText.username} />
                </FormGroup> 
                <FormGroup  className="mb-2 mr-sm-2 mb-sm-0">
                    <Input type="password" name="password" id="password" placeholder={loginText.password} />
                </FormGroup>
                <Button onClick = { () => this.props.loginAction("","") }>{loginText.submit}</Button>
                <NavItem>
                    <NavLink />
                </NavItem>
                <NavItem>
                    <RouterLink className="nav-link" to="/">{loginText.register}</RouterLink>
                </NavItem>
            </Form>
        );
    }
}

export default LoginForm;