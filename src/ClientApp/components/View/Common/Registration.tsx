import * as React from 'react';
import { Form, FormGroup, Label, Input, FormFeedback, Col, Button, Spinner, Alert } from 'reactstrap';
import PageHeader from './PageHeader';
import { IRegistrationPropsView } from '../../../interfaces/registration';

class RegistrationView extends React.PureComponent<IRegistrationPropsView,{}> 
{
    render(){
        return(
            <Form>
                <PageHeader title={ this.props.registrationText.title } />
                { this.props.failedToRegist && <Alert color="danger" >{ this.props.registrationText.failedRegistration }</Alert> }
                { this.props.successToRegist && <Alert color="success" >{ this.props.registrationText.successText.replace( '[USERNAME]', this.props.submitedUsername ) }</Alert> }
                <FormGroup row>
                    <Label xl = {1} sm = {2} >{ this.props.registrationText.name }</Label>
                    <Col xl = {11} sm = {10} >
                        <Input 
                            type="text" 
                            name="registration_name" 
                            id="registration_name"
                            invalid = {this.props.nameIsEmpty}
                            onChange= { (event) => this.props.handleName(event) }
                            value= {this.props.name}
                        />
                        <FormFeedback>
                        { this.props.registrationText.emptyValidation.replace("[FIELD]", this.props.registrationText.name) }
                        </FormFeedback>
                    </Col>                    
                </FormGroup> 
                <FormGroup row>
                    <Label xl = {1} sm = {2} >{ this.props.registrationText.surname }</Label>
                    <Col xl = {11} sm = {10} >
                        <Input 
                            type="text" 
                            name="registration_surname" 
                            id="registration_surname"
                            invalid = {this.props.surnameIsEmpty}
                            onChange= { (event) => this.props.handleSurname(event) }
                            value= {this.props.surname}
                        />
                        <FormFeedback>
                        { this.props.registrationText.emptyValidation.replace("[FIELD]", this.props.registrationText.surname) }
                        </FormFeedback>
                    </Col>                    
                </FormGroup> 
                <FormGroup row>
                    <Label xl = {1} sm = {2} >{ this.props.registrationText.email }</Label>
                    <Col xl = {11} sm = {10} >
                        <Input 
                            type="text" 
                            name="registration_email" 
                            id="registration_email"                            
                            invalid = {this.props.emailIsNotValid}
                            onChange= { (event) => this.props.handleEmail(event) }
                            value= {this.props.email}
                        />
                        <FormFeedback>
                        { this.props.registrationText.invalidEmail }
                        </FormFeedback>
                    </Col>
                </FormGroup> 
                <FormGroup row>
                    <Label xl = {1} sm = {2} >{ this.props.registrationText.username }</Label>
                    <Col xl = {11} sm = {10} >
                        <Input 
                            type="text" 
                            name="registration_username" 
                            id="registration_username"
                            valid = { this.props.validUsername }
                            invalid = {this.props.usernameIsEmpty || this.props.usernameIsInUse}         
                            onChange = { (event) => this.props.handleUsername(event) }
                            onBlur = { () => this.props.checkUsername() }
                            value= { this.props.username }                   
                        />
                        { this.props.isUsernameLoading && <Spinner size="sm" color="secondary" className="loginSpinner"/>}                        
                        <FormFeedback>
                        { this.props.usernameIsInUse? 
                            this.props.registrationText.userInUse 
                            : 
                            this.props.registrationText.emptyValidation.replace("[FIELD]", this.props.registrationText.username) }
                        </FormFeedback>
                    </Col>                    
                </FormGroup> 
                <FormGroup row>
                    <Label xl = {1} sm = {2} >{ this.props.registrationText.password }</Label>
                    <Col xl = {11} sm = {10} >
                        <Input 
                            type="password" 
                            name="registration_password" 
                            id="registration_password"
                            invalid = {this.props.passwordIsEmpty}
                            onChange= { (event) => this.props.handlePassword(event) }
                            value= {this.props.password}
                        />
                        <FormFeedback>
                        { this.props.registrationText.emptyValidation.replace("[FIELD]", this.props.registrationText.password) }
                        </FormFeedback>
                    </Col>
                </FormGroup> 
                <FormGroup row>
                <Col xl={{ size: 11, offset: 1 }} sm={{ size: 10, offset: 2 }}>
                    <Button onClick = { () => this.props.handleSubmit() } >{ this.props.registrationText.submit }</Button>
                </Col>
                </FormGroup>
            </Form>
        );
    }
}

export default RegistrationView;