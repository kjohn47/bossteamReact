import * as React from 'react';
import {ILanguageText} from '../../../interfaces/menu';
import {
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';
import {ptCode, enCode} from '../../../settings';

interface ILanguageMenu {
    languageText?: ILanguageText;
    appGetLanguage: Function;
}

class Language extends React.PureComponent<ILanguageMenu,{}>{
    render(){
        const languageText = this.props.languageText;
        const changeLanguage = this.props.appGetLanguage;
        return(
            <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>{languageText.title}</DropdownToggle>
                <DropdownMenu right>
                    <DropdownItem onClick = {() => changeLanguage(ptCode)}>{languageText.portuguese}</DropdownItem>
                    <DropdownItem onClick = {() => changeLanguage(enCode)}>{languageText.english}</DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
        );
    }
}
    
export default Language;