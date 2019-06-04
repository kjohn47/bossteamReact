import * as React from 'react';
import {Row, Col} from 'reactstrap';
import myAccountLogic from '../Logic/Common/MyAccount';
import MyAccountView from '../View/Common/MyAccount';

const MyAccountForm = myAccountLogic( MyAccountView );

class MyAccount extends React.Component{
    render(){
        return(
            <Row>
                <Col>
                    <MyAccountForm />
                </Col>
            </Row>
        );
    }
}
export default MyAccount;
