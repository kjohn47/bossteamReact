import * as React from 'react';
import { Form, Alert, Toast, ToastHeader, ToastBody, FormGroup, Label, Col, Input, FormFeedback, Button, Tooltip } from 'reactstrap';

export default class CloseAccount extends React.PureComponent<any, any> {
    constructor(props: any) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          tooltipOpen1: false,
          tooltipOpen2: false
        };
    }
    
    toggle(id:number) {
        if(id === 1)
        {
            this.setState({
                tooltipOpen1: !this.state.tooltipOpen1
            });
        }
        else
        {
            this.setState({
                tooltipOpen2: !this.state.tooltipOpen2
            });
        }
    }

    render() {
        return (
            <Form>                    
                { false && <Alert color="danger" >Something bad happened</Alert> }
                { false && <Alert color="success" >Something good happened</Alert> }
                <Toast className="news-content">                
                    <ToastHeader>        
                        Close Account                 
                    </ToastHeader>
                    <ToastBody>
                    <FormGroup row>
                    <Label xl = {1} sm = {2} >Password:</Label>
                            <Col xl = {11} sm = {10} >
                                <Input 
                                    type="password" 
                                    name="account_password" 
                                    id="account_password"
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
                                    name="account_password_repeat" 
                                    id="account_password_repeat"
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
                            <Label xl = {1} sm = {2} >Email:</Label>
                            <Col xl = {11} sm = {10} >
                                <Input 
                                    type="text" 
                                    name="account_email" 
                                    id="account_email"
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
                                <Tooltip placement="top" isOpen={this.state.tooltipOpen1} autohide={false} target="disableAccountButton" toggle={() => this.toggle(1)}>  
                                    You wont be able to login and all your posts will be hidden but no data is lost, comments on other posts will stay visible
                                    You can reactivate your account with the link sent to your email.
                                </Tooltip>      
                                <Button id="disableAccountButton" className = "buttonMargin" onClick = { () => {} } >Disable Account</Button>                                
                                <span className = "spacerSpan"></span>
                                <Tooltip placement="top" isOpen={this.state.tooltipOpen2} autohide={false} target="closeAccountButton" toggle={() => this.toggle(2)}>  
                                    Your account and all your data will be removed and the username will be available for creating new account
                                </Tooltip>   
                                <Button id="closeAccountButton" className = "buttonMargin" onClick = { () => {} } >Close Account</Button>
                            </Col>
                            </FormGroup>
                    </ToastBody>
                </Toast>                    
            </Form>
        );
    }
}