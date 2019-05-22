import {Row,Col} from 'reactstrap';
import * as React from 'react';
import { IErrorHandling } from '../../../interfaces/common';


class ErrorHandlingView extends React.PureComponent<IErrorHandling,{}>{
    render(){
        return(                                
            <Row>
                <Col>    
                    <Row>
                        <Col className="errorTitle">
                            { this.props.errorTitle }
                        </Col>
                    </Row>  
                    <Row>
                        <Col className="errorMessage">
                            { this.props.errorMessage }
                        </Col>
                    </Row>                                   
                </Col>
            </Row>
            )};
}
export default ErrorHandlingView;