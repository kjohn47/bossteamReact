import * as React from 'react';
import {Row, Col} from 'reactstrap';
import myAccountLogic from '../Logic/MyAccount/MyAccount';
import MyAccountView from '../View/MyAccount/MyAccount';
import needLoginLogic from '../Logic/Common/NeedLogin';
import loginLogic from '../Logic/Common/LoginLogic';
import Login from '../View/Common/Login';

const LoginForm = loginLogic(Login);
const MyAccountForm = myAccountLogic( MyAccountView );
const NeedLogin = needLoginLogic(LoginForm);

class MyAccount extends React.Component{
    render(){
        return(
            <Row>
                <Col>
                    <NeedLogin>
                        <MyAccountForm />
                    </NeedLogin>
                </Col>
            </Row>
        );
    }
}
export default MyAccount;
