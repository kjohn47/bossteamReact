import * as React from 'react';
import { Form, Alert, FormGroup, Label, Col, Input, FormFeedback, Button } from 'reactstrap';
import PageHeader from './PageHeader';

class MyAccountView extends React.PureComponent<{},{}>{

    render() {
        return(
            <Form>
            <PageHeader title="Page Title - Account Settings"/>
            { false && <Alert color="danger" >Something bad happened</Alert> }
            { false && <Alert color="success" >Something good happened</Alert> }
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
        </Form>
        );
    }
}

export default MyAccountView;