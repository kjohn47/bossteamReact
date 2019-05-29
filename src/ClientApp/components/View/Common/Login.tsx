import * as React from 'react';
import { Button, Form, FormGroup, Input, Spinner, FormFeedback, Alert, Label } from 'reactstrap';
import { ILogin } from '../../../interfaces/login';
import { NavLink as RouterLink } from 'react-router-dom';

class Login extends React.PureComponent<ILogin,{}>{
    render(){
        const loginText = this.props.loginText;
        return (
            <Form>
                {
                     this.props.loginAction.state.loginAttempt && this.props.loginAction.state.invalidUser &&
                    <Alert color = "danger">{this.props.loginText.invalidLogin}</Alert>
                }
                <FormGroup  className="mb-2 mr-sm-2 mb-sm-0">
                    <Label>{loginText.username}</Label>
                    <Input 
                        type="text" 
                        name="user" 
                        id="user" 
                        onChange = { ( event:any ) => this.props.loginAction.handleUser( event ) }
                        value = { this.props.loginAction.state.user }  
                        invalid = { this.props.loginAction.state.loginAttempt && ( this.props.loginAction.state.emptyUser || this.props.loginAction.state.invalidUser ) }  
                    />
                    {
                        this.props.loginAction.state.emptyPassword && 
                        <FormFeedback>
                            { this.props.loginText.emptyUser }
                        </FormFeedback>
                    }
                </FormGroup> 
                &nbsp;
                <FormGroup  className="mb-2 mr-sm-2 mb-sm-0">
                    <Label>{loginText.password}</Label>
                    <Input 
                        type="password" 
                        name="password" 
                        id="password" 
                        onChange = { ( event:any ) => this.props.loginAction.handlePassword( event ) }
                        value = { this.props.loginAction.state.password }    
                        invalid = {  this.props.loginAction.state.loginAttempt && ( this.props.loginAction.state.emptyPassword || this.props.loginAction.state.invalidUser ) }  
                    />
                    {
                        this.props.loginAction.state.emptyPassword && 
                            <FormFeedback>
                                { this.props.loginText.emptyPassword }
                            </FormFeedback>
                     }
                </FormGroup>
                <div className="login_form_btn login_form_big">
                    { this.props.loading ? 
                            <Spinner size="sm" color="secondary" className="loginSpinner"/>
                        :
                            <Button onClick = { () => this.props.loginAction.makeLogin() }>{loginText.submit}</Button>
                    }
                    { this.props.loading ?
                            <div className="nav-link registLink">{loginText.register}</div>
                        :
                            <RouterLink className="nav-link registLink" to="/">{loginText.register}</RouterLink>
                    }
                </div>
            </Form>
        );
    }
}

export default Login;