import * as React from 'react';
import {Row, Col} from 'reactstrap';

////const MyAccountForm = myAccountLogic( MyAccountView );

class MyAccount extends React.Component{
    render(){
        return(
            <Row>
                <Col>
                    <div>
                        My account page
                    </div>
                </Col>
            </Row>
        );
    }
}
export default MyAccount;
