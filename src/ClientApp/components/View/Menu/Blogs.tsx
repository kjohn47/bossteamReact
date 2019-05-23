import * as React from 'react';
import {IblogsText} from "../../../interfaces/menu";
import { IcurrentUser } from '../../../interfaces/currentUser';
import {
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';
import {NavLink as RouterLink} from 'react-router-dom';

interface IblogMenu {
    blogsText? : IblogsText;
    user? : IcurrentUser;
}

class Blogs extends React.PureComponent<IblogMenu,{}>{
    render(){
        const blogsText = this.props.blogsText;
        return(
            <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>{blogsText.title}</DropdownToggle>
                    <DropdownMenu right>
                    <DropdownItem>{blogsText.list}</DropdownItem>
                    <DropdownItem>{blogsText.mine}</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>{blogsText.add}</DropdownItem>
                    <DropdownItem>{blogsText.editSpace}</DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
        );
    }
}
    
export default Blogs;