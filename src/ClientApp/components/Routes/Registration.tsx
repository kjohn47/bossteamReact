import * as React from 'react';
import {Row, Col} from 'reactstrap';
import registrationLogic from '../Logic/Common/Registration';
import RegistrationView from '../View/Common/Registration';

const RegistrationForm = registrationLogic( RegistrationView );

class Registration extends React.Component{
    render(){
        return(
            <Row>
                <Col>
                    <RegistrationForm />
                </Col>
            </Row>
        );
    }
}
export default Registration;
