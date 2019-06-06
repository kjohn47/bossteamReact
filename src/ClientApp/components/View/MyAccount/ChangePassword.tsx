import * as React from 'react';
import { Form, Alert, Toast, ToastHeader, ToastBody, FormGroup, Label, Col, Input, FormFeedback, Button } from 'reactstrap';

export default class ChangePassword extends React.PureComponent<any> {
    render() {
        return (
            <Form>                    
                { false && <Alert color="danger" >Something bad happened</Alert> }
                { false && <Alert color="success" >Something good happened</Alert> }
                <Toast className="news-content">                
                    <ToastHeader>        
                        Change Password:                  
                    </ToastHeader>
                    <ToastBody>
                    <FormGroup row>
                    <Label xl = {1} sm = {2} >Old:</Label>
                            <Col xl = {11} sm = {10} >
                                <Input 
                                    type="password" 
                                    name="account_old_password" 
                                    id="account_old_password"
                                    invalid = {false}
                                    onChange= { (event) => {} }
                                    value= ""
                                />
                                <FormFeedback>
                                    Empty Field
                                </FormFeedback>
                            </Col>                 
                        </FormGroup> 
                        <FormGroup row>
                            <Label xl = {1} sm = {2} >New:</Label>
                            <Col xl = {11} sm = {10} >
                                <Input 
                                    type="password" 
                                    name="account_new_password" 
                                    id="account_new_password"
                                    invalid = {false}
                                    onChange= { (event) => {} }
                                    value= ""
                                />
                                <FormFeedback>
                                    Empty Field
                                </FormFeedback>
                            </Col>                    
                        </FormGroup> 
                        <FormGroup row>
                            <Label xl = {1} sm = {2} >Repeat:</Label>
                            <Col xl = {11} sm = {10} >
                                <Input 
                                    type="password" 
                                    name="account_new_password_repeat" 
                                    id="account_new_password_repeat"
                                    invalid = {false}
                                    onChange= { (event) => {} }
                                    value= ""
                                />
                                <FormFeedback>
                                    Empty Field
                                </FormFeedback>
                            </Col>                    
                        </FormGroup> 
                        <FormGroup row>
                            <Col xl={{ size: 11, offset: 1 }} sm={{ size: 10, offset: 2 }}>
                                <Button onClick = { () => {} } >Submit changes</Button>
                            </Col>
                            </FormGroup>
                    </ToastBody>
                </Toast>                    
            </Form>
        );
    }
}