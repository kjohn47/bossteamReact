import * as React from 'react';
import {IeventsText} from '../../../interfaces/menu';
import { IcurrentUser } from '../../../interfaces/currentUser';
import {
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';
import {NavLink as RouterLink} from 'react-router-dom';

interface IEventMenu {
    eventsText? : IeventsText;
    user? : IcurrentUser;
}
    
class Events extends React.PureComponent<IEventMenu,{}>{
    render(){
        const eventsText = this.props.eventsText;
        return(
            <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>{eventsText.title}</DropdownToggle>
                    <DropdownMenu right>
                    <DropdownItem>{eventsText.list}</DropdownItem>
                    <DropdownItem>{eventsText.mine}</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>{eventsText.add}</DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
        );
    }
}
    
export default Events;