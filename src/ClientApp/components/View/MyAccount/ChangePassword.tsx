import * as React from 'react';
import { Form, Alert, Toast, ToastHeader, ToastBody, FormGroup, Label, Col, Input, FormFeedback, Button, Spinner } from 'reactstrap';
import { IMyAccountChangePasswordViewType } from '../../../interfaces/myAccount';

export default class ChangePassword extends React.PureComponent<IMyAccountChangePasswordViewType> {
    render() {
        return (
            <Form>                    
                { this.props.updateFail && <Alert color="danger">{ this.props.text.fail }</Alert> }
                { this.props.updateSuccess && <Alert color="success">{ this.props.text.success }</Alert> }
                <Toast className="news-content">                
                    <ToastHeader>        
                        { this.props.text.title }                 
                    </ToastHeader>
                    <ToastBody>
                    <FormGroup row>
                    <Label xl = {1} sm = {2} >{ this.props.text.oldPassword }</Label>
                            <Col xl = {11} sm = {10} >
                                <Input 
                                    type="password" 
                                    name="account_old_password" 
                                    id="account_old_password"
                                    valid = { this.props.validOldPassword }
                                    invalid = { this.props.wrongOldPassword || this.props.emptyOldPassword }
                                    onChange = { (event) => this.props.oldPasswordHandle( event ) }
                                    onBlur = { () => this.props.oldPasswordCheck() }
                                    value = { this.props.oldPassword }
                                />
                                { this.props.oldPasswordLoading && <Spinner size="sm" color="secondary" className="loginSpinner"/> } 
                                <FormFeedback>
                                    { this.props.wrongOldPassword ? this.props.text.passwordNotMatch : this.props.text.emptyField.replace( "[FIELD]", this.props.text.oldPassword ) }
                                </FormFeedback>
                            </Col>                 
                        </FormGroup> 
                        <FormGroup row>
                            <Label xl = {1} sm = {2} >{ this.props.text.newPassword }</Label>
                            <Col xl = {11} sm = {10} >
                                <Input 
                                    type="password" 
                                    name="account_new_password" 
                                    id="account_new_password"
                                    invalid = { this.props.emptynewPassword }
                                    valid = { this.props.validPasswordRepeat }
                                    onChange = { (event) => this.props.newPasswordHandle( event ) }
                                    value = { this.props.newPassword }
                                />
                                <FormFeedback>
                                    { this.props.text.emptyField.replace( "[FIELD]", this.props.text.newPassword ) }
                                </FormFeedback>
                            </Col>                    
                        </FormGroup> 
                        <FormGroup row>
                            <Label xl = {1} sm = {2} >{ this.props.text.repeatPassword }</Label>
                            <Col xl = {11} sm = {10} >
                                <Input 
                                    type="password" 
                                    name="account_new_password_repeat" 
                                    id="account_new_password_repeat"
                                    invalid = { this.props.notMatchPassword }
                                    valid = { this.props.validPasswordRepeat }
                                    onChange = { (event) => this.props.repeatPasswordHandle( event ) }
                                    value = { this.props.repeatPassword }
                                    onBlur = { () => this.props.repeatPasswordCheck() }
                                />
                                <FormFeedback>
                                    { this.props.text.passwordNotMatch }
                                </FormFeedback>
                            </Col>                    
                        </FormGroup> 
                        <FormGroup row>
                            <Col xl={{ size: 11, offset: 1 }} sm={{ size: 10, offset: 2 }}>
                                {   
                                    this.props.loading ? 
                                    <Spinner size="sm" color="secondary" className="loginSpinner"/> 
                                : 
                                    <Button onClick = { () => this.props.submitHandle() } >{ this.props.text.submit }</Button>
                                }
                            </Col>
                            </FormGroup>
                    </ToastBody>
                </Toast>                    
            </Form>
        );
    }
}