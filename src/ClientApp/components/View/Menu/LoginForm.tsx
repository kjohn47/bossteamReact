import * as React from 'react';
import {NavItem, NavLink, Button, Form, FormGroup, Input, Spinner, FormFeedback, UncontrolledTooltip } from 'reactstrap';
import {ILogin} from '../../../interfaces/login';
import {NavLink as RouterLink} from 'react-router-dom';
import { registrationRoute } from '../../../settings';

class LoginForm extends React.PureComponent<ILogin,{}>{

    render(){
        const loginText = this.props.loginText;
        return (
            <Form inline>
                { !this.props.loading &&
                <FormGroup  className="mb-2 mr-sm-2 mb-sm-0">
                    <Input 
                        type="text" 
                        name="user_inline" 
                        id="user_inline" 
                        placeholder={loginText.username} 
                        onChange = { ( event ) => this.props.loginAction.handleUser( event ) }
                        onKeyDown = { ( event ) => this.props.loginAction.handleKeyPress( event, 'password_inline', false ) }
                        value = { this.props.loginAction.state.user }  
                        invalid = { this.props.loginAction.state.loginAttempt && ( this.props.loginAction.state.emptyUser || this.props.loginAction.state.invalidUser ) }  
                    />
                    <FormFeedback tooltip>
                        { this.props.loginAction.state.emptyUser ? this.props.loginText.emptyUser : this.props.loginText.invalidLogin }
                    </FormFeedback>
                </FormGroup> }
                &nbsp;
                { !this.props.loading &&
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Input 
                        type="password" 
                        name="password_inline" 
                        id="password_inline" 
                        placeholder={loginText.password} 
                        onChange = { ( event ) => this.props.loginAction.handlePassword( event ) }
                        onKeyDown = { ( event ) => this.props.loginAction.handleKeyPress( event, '', true ) }
                        value = { this.props.loginAction.state.password }    
                        invalid = { this.props.loginAction.state.loginAttempt && ( this.props.loginAction.state.emptyPassword || this.props.loginAction.state.invalidUser ) }  
                    />
                    {                        
                        <FormFeedback tooltip>
                            { this.props.loginAction.state.emptyPassword ? this.props.loginText.emptyPassword : <RouterLink to="/" className="nav-link loginPassRecover">{ this.props.loginText.passwordRecover }</RouterLink> }
                        </FormFeedback>
                     }
                </FormGroup>}
                { !this.props.loading &&
                <FormGroup check>                
                    <Input 
                        type = "checkbox"
                        name = "isPermanent_inline"
                        id = "isPermanent_inline"
                        checked = {this.props.loginAction.state.isPermanent}
                        onChange = { () => { this.props.loginAction.handleIsPermanent() } }
                    /> 
                    <UncontrolledTooltip placement="bottom" target="isPermanent_inline">
                        { this.props.loginText.stayLoggedIn }
                    </UncontrolledTooltip>
                </FormGroup>}
                <div className="login_form_btn">
                    { this.props.loading ? 
                            <Spinner size="sm" color="light" className="loginSpinner menubarLogin"/>
                        :
                            <Button onClick = { () => this.props.loginAction.makeLogin() }>{loginText.submit}</Button>
                    }
                    <NavItem>
                        <NavLink />
                    </NavItem>
                    <NavItem>
                    { !this.props.loading &&
                            <RouterLink className="nav-link registLink" to={registrationRoute}>{loginText.register}</RouterLink>
                    }
                    </NavItem>
                </div>
            </Form>
        );
    }
}

export default LoginForm;