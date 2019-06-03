import * as React from 'react';
import { Row, Col } from 'reactstrap';
import PageHeader from './PageHeader';
import { IRegistrationSuccessPropsView } from '../../../interfaces/registration';

class SuccessRegistrationView extends React.PureComponent<IRegistrationSuccessPropsView,{}>{
    render(){
        return(
            <React.Fragment>
                <PageHeader title= { this.props.title } />
                <Row>
                    <Col xs="12">
                        <h2>{ this.props.successText.replace( '[USERNAME]', this.props.username ) }</h2>
                    </Col>
                </Row>
            </React.Fragment>
        )};
}
export default SuccessRegistrationView;