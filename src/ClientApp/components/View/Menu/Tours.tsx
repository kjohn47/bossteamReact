import * as React from 'react';
import {ItoursText} from '../../../interfaces/menu';
import { IcurrentUser } from '../../../interfaces/currentUser';
import {
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';
import {NavLink as RouterLink} from 'react-router-dom';

interface IToursMenu {
    toursText?: ItoursText;
    user?: IcurrentUser;
}

class Tours extends React.PureComponent<IToursMenu,{}>{
    render(){
        const toursText = this.props.toursText;
        return(
            <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>{toursText.title}</DropdownToggle>
                    <DropdownMenu right>
                    <DropdownItem>{toursText.list}</DropdownItem>
                    <DropdownItem>{toursText.mine}</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>{toursText.add}</DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
        );
    }
}
    
export default Tours;