import * as React from 'react';
import {NavItem, NavLink, Button, Form, FormGroup, Label, Input, Spinner } from 'reactstrap';
import {ILogin} from '../../../interfaces/login';
import {NavLink as RouterLink} from 'react-router-dom';

class LoginForm extends React.PureComponent<ILogin,{}>{
    render(){
        const loginText = this.props.loginText;
        return (
            <Form inline>
                <FormGroup  className="mb-2 mr-sm-2 mb-sm-0">
                    <Input 
                        type="text" 
                        name="user" 
                        id="user" 
                        placeholder={loginText.username} 
                        onChange = { ( event:any ) => this.props.loginAction.handleUser( event ) }
                        value = { this.props.loginAction.state.user }    
                    />
                </FormGroup> 
                &nbsp;
                <FormGroup  className="mb-2 mr-sm-2 mb-sm-0">
                    <Input 
                        type="password" 
                        name="password" 
                        id="password" 
                        placeholder={loginText.password} 
                        onChange = { ( event:any ) => this.props.loginAction.handlePassword( event ) }
                        value = { this.props.loginAction.state.password }    
                    />
                </FormGroup>
                <div className="login_form_btn">
                    { this.props.loading ? 
                            <Spinner size="sm" color="light" className="loginSpinner"/>
                        :
                            <Button onClick = { () => this.props.loginAction.makeLogin() }>{loginText.submit}</Button>
                    }
                    <NavItem>
                        <NavLink />
                    </NavItem>
                    <NavItem>
                    { this.props.loading ?
                            <div className="nav-link registLink">{loginText.register}</div>
                        :
                            <RouterLink className="nav-link registLink" to="/">{loginText.register}</RouterLink>
                    }
                    </NavItem>
                </div>
            </Form>
        );
    }
}

export default LoginForm;