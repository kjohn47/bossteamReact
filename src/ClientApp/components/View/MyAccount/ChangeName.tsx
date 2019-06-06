import * as React from 'react';
import { Form, Alert, Toast, ToastHeader, ToastBody, FormGroup, Label, Col, Input, FormFeedback, Button } from 'reactstrap';
import { IMyAccountChangeNameViewProps } from '../../../interfaces/myAccount';

export default class ChangeName extends React.PureComponent<IMyAccountChangeNameViewProps> {
    render() {
        return (
            <Form>                    
                { this.props.updateFail && <Alert color="danger">{ this.props.text.fail }</Alert> }
                { this.props.updateSuccess && <Alert color="success">{ this.props.text.success }</Alert> }
                <Toast className="news-content">                
                    <ToastHeader>        
                        {this.props.text.title}
                    </ToastHeader>
                    <ToastBody>
                    <FormGroup row>
                            <Label xl = {1} sm = {2} >{ this.props.text.email }</Label>
                            <Label xl = {11} sm = {10}>{ this.props.email }</Label>
                        </FormGroup> 
                        <FormGroup row>
                            <Label xl = {1} sm = {2} >{ this.props.text.name }</Label>
                            <Col xl = {11} sm = {10} >
                                <Input 
                                    type="text" 
                                    name="account_name" 
                                    id="account_name"
                                    invalid = { this.props.emptyName }
                                    onChange= { ( event ) => this.props.nameHandle( event ) }
                                    value= { this.props.name }
                                />
                                <FormFeedback>
                                    { this.props.text.emptyField.replace("[FIELD]", this.props.text.name) }
                                </FormFeedback>
                            </Col>                    
                        </FormGroup> 
                        <FormGroup row>
                            <Label xl = {1} sm = {2} >{this.props.text.surname}</Label>
                            <Col xl = {11} sm = {10} >
                                <Input 
                                    type="text" 
                                    name="account_surname" 
                                    id="account_surname"
                                    invalid = { this.props.emptySurname }
                                    onChange= { ( event ) => this.props.surnameHandle( event ) }
                                    value= { this.props.surname }
                                />
                                <FormFeedback>
                                    { this.props.text.emptyField.replace("[FIELD]", this.props.text.surname) }
                                </FormFeedback>
                            </Col>                    
                        </FormGroup> 
                        <FormGroup row>
                            <Col xl={{ size: 11, offset: 1 }} sm={{ size: 10, offset: 2 }}>
                                <Button onClick = { () => this.props.submitHandle() } >{ this.props.text.submit }</Button>
                            </Col>
                            </FormGroup>
                    </ToastBody>
                </Toast>                    
            </Form>
        );
    }
}