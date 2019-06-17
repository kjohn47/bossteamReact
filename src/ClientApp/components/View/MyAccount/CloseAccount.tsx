import * as React from 'react';
import { Form, Alert, Toast, ToastHeader, ToastBody, FormGroup, Label, Col, Input, FormFeedback, Button, Tooltip, Spinner, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { IMyAccountCloseViewType } from '../../../interfaces/myAccount';

interface ICloseAccountState {
    toolTipCloseAccount: boolean;
    toolTipDisableAccount: boolean;
    modalToggle: boolean;
}

export default class CloseAccount extends React.PureComponent<IMyAccountCloseViewType, ICloseAccountState> {
    constructor(props: IMyAccountCloseViewType) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.modalToggle = this.modalToggle.bind( this );
        this.state = {
            toolTipCloseAccount: false,
            toolTipDisableAccount: false,
            modalToggle: false
        };
    }
    
    toggle(id:number) {
        if(id === 2)
        {
            this.setState({
                toolTipCloseAccount: !this.state.toolTipCloseAccount
            });
        }
        else
        {
            this.setState({
                toolTipDisableAccount: !this.state.toolTipDisableAccount
            });
        }
    }

    modalToggle(): void {
        this.setState(prevState => ({
            modalToggle: !prevState.modalToggle
          }));
    }

    render() {
        return (
            <Form>                    
                { this.props.updateFail && <Alert color="danger" >{ this.props.text.fail }</Alert> }
                { this.props.updateSuccess && <Alert color="success" >{ this.props.text.success }</Alert> }
                <Toast className="news-content">                
                    <ToastHeader>        
                        { this.props.text.title }
                    </ToastHeader>
                    <ToastBody>
                    <Modal isOpen={this.state.modalToggle} toggle={this.modalToggle} >
                        <ModalHeader toggle={this.modalToggle}>{ this.props.text.closeModalTitle }</ModalHeader>
                        <ModalBody>
                            { this.props.text.closeTooltip }
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={ () => this.props.closeHandle() }>{ this.props.text.close }</Button>{' '}
                            <Button color="secondary" onClick={this.modalToggle}>{ this.props.text.cancel }</Button>
                        </ModalFooter>
                    </Modal>
                    <FormGroup row>
                    <Label xl = {1} sm = {2} >{ this.props.text.password }</Label>
                            <Col xl = {11} sm = {10} >
                                <Input 
                                    type="password" 
                                    name="account_password" 
                                    id="account_password"
                                    invalid = { this.props.emptyPassword || this.props.passwordNotMatch }
                                    valid = { this.props.validPassword }
                                    onChange = { (event) => this.props.passwordHandle( event ) }
                                    onBlur = { () => this.props.passwordCheck() }
                                    value = { this.props.password }
                                />
                                { this.props.passwordLoading && <Spinner size="sm" color="secondary" className="loginSpinner"/> } 
                                <FormFeedback>
                                    { this.props.passwordNotMatch? this.props.text.passwordNotMatch : this.props.text.emptyField.replace( "[FIELD]", this.props.text.password ) }
                                </FormFeedback>
                            </Col>                 
                        </FormGroup> 
                        <FormGroup row>
                            <Label xl = {1} sm = {2} >{ this.props.text.email }</Label>
                            <Col xl = {11} sm = {10} >
                                <Input 
                                    type="text" 
                                    name="account_email" 
                                    id="account_email"                                    
                                    invalid = { this.props.invalidEmail || this.props.checkEmail }
                                    valid = { this.props.validEmail }
                                    onChange = { (event) => this.props.emailHandle( event ) }
                                    onBlur = { () => this.props.emailCheck() }
                                    value = { this.props.email }
                                />
                                { this.props.emailLoading && <Spinner size="sm" color="secondary" className="loginSpinner"/> } 
                                <FormFeedback>
                                    { this.props.checkEmail ? this.props.text.emailNotEqual : this.props.text.invalidEmail }
                                </FormFeedback>
                            </Col>                    
                        </FormGroup> 
                        <FormGroup row>
                            <Col xl={{ size: 11, offset: 1 }} sm={{ size: 10, offset: 2 }}>
                            {   
                                this.props.loading ? 
                                <Spinner size="sm" color="secondary" className="loginSpinner"/> 
                                : 
                                <React.Fragment>
                                    <Tooltip placement="top" isOpen={this.state.toolTipDisableAccount} autohide={true} target="disableAccountButton" toggle={() => this.toggle(1)}>  
                                        {  this.props.userEnabled? this.props.text.disableTooltip : this.props.text.enableToolTip }
                                    </Tooltip>      
                                    <Button id="disableAccountButton" className = "buttonMargin" onClick = { () => this.props.disableHandle() } >{ this.props.userEnabled? this.props.text.disable : this.props.text.enable }</Button>                                
                                    <span className = "spacerSpan"></span>
                                    <Tooltip placement="top" isOpen={this.state.toolTipCloseAccount} autohide={true} target="closeAccountButton" toggle={() => this.toggle(2)}>  
                                        { this.props.text.closeTooltip }
                                    </Tooltip>   
                                    <Button id="closeAccountButton" className = "buttonMargin" onClick = { this.modalToggle } >{ this.props.text.close }</Button>
                                </React.Fragment>
                            }
                            </Col>
                            </FormGroup>
                    </ToastBody>
                </Toast>                    
            </Form>
        );
    }
}