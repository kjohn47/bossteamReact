import * as React from 'react';
import { TabPane, TabContent, Nav, NavItem, NavLink } from 'reactstrap';
import PageHeader from '../Common/PageHeader';
import ChangeName from './ChangeName';
import ChangePassword from './ChangePassword';
import CloseAccount from './CloseAccount';
import { IMyAccountViewProps } from '../../../interfaces/myAccount';

interface MyAccountViewState {
  activeTab: string;
}

class MyAccountView extends React.PureComponent<IMyAccountViewProps, MyAccountViewState>{

    constructor(props:IMyAccountViewProps) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          activeTab: '1'
        };
      }
    
      toggle(tab: string) {
        if (this.state.activeTab !== tab) {
          this.props.changeTabHandle();
          this.setState({
            activeTab: tab
          });
        }
      }

    render() {
        return(
          <React.Fragment>
            <PageHeader title = { this.props.myAccountText.title }/>
            <Nav tabs>
              <NavItem>
                <NavLink
                  className = { this.state.activeTab === '1'? 'active' : '' }
                  onClick={() => { this.toggle('1'); }}
                >
                  { this.props.myAccountText.nameTab }
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className = { this.state.activeTab === '2'? 'active' : '' }
                  onClick={() => { this.toggle('2'); }}
                >
                  { this.props.myAccountText.passwordTab }
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className = { this.state.activeTab === '3'? 'active' : '' }
                  onClick={() => { this.toggle('3'); }}
                >
                  { this.props.myAccountText.closeTab }
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
                <ChangeName {...this.props.changeName} />
              </TabPane>
              <TabPane tabId="2">
                <ChangePassword {...this.props.changePassword}  />
              </TabPane>
              <TabPane tabId="3">
                <CloseAccount {...this.props.closeAccount}  />
              </TabPane>
            </TabContent>
          </React.Fragment>
        );
    }
}

export default MyAccountView;