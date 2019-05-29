import * as React from 'react';
import ListItem from '../View/Common/ListItem';
import {Row, Col} from 'reactstrap';
import loginLogic from '../Logic/Common/LoginLogic';
import needLoginLogic from '../Logic/Common/NeedLogin';
import Login from '../View/Common/Login';

const LoginForm = loginLogic(Login);
const NeedLogin = needLoginLogic(LoginForm);

class BlogsListAll extends React.Component{
    render(){
        return(
            <Row>
                <Col>
                    <NeedLogin>
                        Some Blogs list
                    </NeedLogin>
                </Col>
            </Row>
        );
    }
}
export default BlogsListAll;
