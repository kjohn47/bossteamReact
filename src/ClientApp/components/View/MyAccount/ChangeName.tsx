import * as React from 'react';
import { Form, Alert, Toast, ToastHeader, ToastBody, FormGroup, Label, Col, Input, FormFeedback, Button } from 'reactstrap';

export default class ChangeName extends React.PureComponent<any> {
    render() {
        return (
            <Form>                    
                { false && <Alert color="danger" >Something bad happened</Alert> }
                { false && <Alert color="success" >Something good happened</Alert> }
                <Toast className="news-content">                
                    <ToastHeader>        
                        Change User Name/Surname:                   
                    </ToastHeader>
                    <ToastBody>
                    <FormGroup row>
                            <Label xl = {1} sm = {2} >EMail:</Label>
                            <Label xl = {11} sm = {10} >EMail@mail.com</Label>                   
                        </FormGroup> 
                        <FormGroup row>
                            <Label xl = {1} sm = {2} >NAME:</Label>
                            <Col xl = {11} sm = {10} >
                                <Input 
                                    type="text" 
                                    name="account_name" 
                                    id="account_name"
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
                            <Label xl = {1} sm = {2} >SURNAME:</Label>
                            <Col xl = {11} sm = {10} >
                                <Input 
                                    type="text" 
                                    name="account_surname" 
                                    id="account_surname"
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