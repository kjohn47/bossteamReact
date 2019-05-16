import * as React from 'react';
import {IusrMnText} from '../../../interfaces/menu';
import { IcurrentUser } from '../../../interfaces/currentUser';
import {
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';
import {NavLink as RouterLink} from 'react-router-dom';

interface IUserMenuText {
    userMnText?: IusrMnText;
    user?: IcurrentUser;
}

class UserMenu extends React.PureComponent<IUserMenuText,{}>{
    render(){
        const userName = this.props.user.name + ' ' + this.props.user.surname;
        const userMnText = this.props.userMnText;
        return(
            <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>{userName}</DropdownToggle>
                <DropdownMenu right>
                    <DropdownItem>{userMnText.administration}</DropdownItem>
                    <DropdownItem>{userMnText.account}</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>{userMnText.logout}</DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
        );
    }
}
    
export default UserMenu;