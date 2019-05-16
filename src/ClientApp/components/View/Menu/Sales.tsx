import * as React from 'react';
import {IsalesText} from '../../../interfaces/menu';
import { IcurrentUser } from '../../../interfaces/currentUser';
import {
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';
import {NavLink as RouterLink} from 'react-router-dom';

interface ISalesMenu {
    salesText?: IsalesText;
    user?: IcurrentUser;
}

class Sales extends React.PureComponent<ISalesMenu,{}>{
    render(){
        const salesText = this.props.salesText;
        return(
            <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>{salesText.title}</DropdownToggle>
                    <DropdownMenu right>
                    <DropdownItem>{salesText.list}</DropdownItem>
                    <DropdownItem>{salesText.mine}</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>{salesText.add}</DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
        );
    }
}
    
export default Sales;