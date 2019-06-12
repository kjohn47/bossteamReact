import * as React from 'react';
import {IUserMenu} from '../../../interfaces/menu';
import {
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem, 
    Spinner} from 'reactstrap';
import {NavLink as RouterLink} from 'react-router-dom';
import { myAccountRoute } from '../../../settings';



class UserMenu extends React.PureComponent<IUserMenu,{}>{
    render(){
        const userName = this.props.user.name + ' ' + this.props.user.surname;
        const userMnText = this.props.userMnText;
        return(
            
            this.props.loading? 
            <div className="userMenuSpace">
                <Spinner  size="sm" color="light" className="loginSpinner"/>
            </div>
            :
            <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>{userName}</DropdownToggle>
                <DropdownMenu right>
                    <DropdownItem>{userMnText.administration}</DropdownItem>
                    <RouterLink to = {myAccountRoute}><DropdownItem>{userMnText.account}</DropdownItem></RouterLink>
                    <DropdownItem divider />
                    <DropdownItem onClick= {() => this.props.userMenuAction()}>{userMnText.logout}</DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
            
        );
    }
}
    
export default UserMenu;