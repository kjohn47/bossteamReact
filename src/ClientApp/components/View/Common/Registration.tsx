import * as React from 'react';
import { Form, FormGroup, Label, Input, FormFeedback, Col, Button } from 'reactstrap';
import PageHeader from './PageHeader';

class RegistrationView extends React.PureComponent<{},{}> 
{
    render(){
        return(
            <Form>
                <PageHeader title="Registration:" />
                <FormGroup row>
                    <Label xl = {1} sm = {2} >Name:</Label>
                    <Col xl = {11} sm = {10} >
                        <Input 
                            type="text" 
                            name="registration_name" 
                            id="registration_name"
                            invalid = {false}
                        />
                    </Col>
                    <FormFeedback>
                        Invalid Text
                    </FormFeedback>
                </FormGroup> 
                <FormGroup row>
                    <Label xl = {1} sm = {2} >Surname:</Label>
                    <Col xl = {11} sm = {10} >
                        <Input 
                            type="text" 
                            name="registration_surname" 
                            id="registration_surname"
                            invalid = {false}
                        />
                    </Col>
                    <FormFeedback>
                        Invalid Text
                    </FormFeedback>
                </FormGroup> 
                <FormGroup row>
                    <Label xl = {1} sm = {2} >Email:</Label>
                    <Col xl = {11} sm = {10} >
                        <Input 
                            type="email" 
                            name="registration_email" 
                            id="registration_email"                            
                            invalid = {false}
                        />
                    </Col>
                    <FormFeedback>
                        Invalid Text
                    </FormFeedback>
                </FormGroup> 
                <FormGroup row>
                    <Label xl = {1} sm = {2} >Username:</Label>
                    <Col xl = {11} sm = {10} >
                        <Input 
                            type="text" 
                            name="registration_username" 
                            id="registration_username"
                            invalid = {false}
                        />
                    </Col>
                    <FormFeedback>
                        Invalid Text
                    </FormFeedback>
                </FormGroup> 
                <FormGroup row>
                    <Label xl = {1} sm = {2} >Password:</Label>
                    <Col xl = {11} sm = {10} >
                        <Input 
                            type="password" 
                            name="registration_password" 
                            id="registration_password"
                            invalid = {false}
                        />
                    </Col>
                    <FormFeedback>
                        Invalid Text
                    </FormFeedback>
                </FormGroup> 
                <FormGroup row>
                <Col xl={{ size: 11, offset: 1 }} sm={{ size: 10, offset: 2 }}>
                    <Button onClick = { () => {} } >Submit</Button>
                </Col>
                </FormGroup>
            </Form>
        );
    }
}

export default RegistrationView;