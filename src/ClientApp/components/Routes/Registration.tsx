import * as React from 'react';
import {Row, Col} from 'reactstrap';
import registrationLogic from '../Logic/Common/Registration';
import RegistrationView from '../View/Common/Registration';
import SuccessRegistrationView from '../View/Common/SuccessRegistration';

const RegistrationForm = registrationLogic( RegistrationView, SuccessRegistrationView );

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
