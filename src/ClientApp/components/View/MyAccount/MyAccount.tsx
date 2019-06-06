import * as React from 'react';
import { TabPane, TabContent, Nav, NavItem, NavLink } from 'reactstrap';
import PageHeader from '../Common/PageHeader';
import ChangeName from './ChangeName';
import ChangePassword from './ChangePassword';
import CloseAccount from './CloseAccount';

interface MyAccountViewState {
  activeTab: string;
}

class MyAccountView extends React.PureComponent<any,MyAccountViewState>{

    constructor(props:any) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          activeTab: '1'
        };
      }
    
      toggle(tab: any) {
        if (this.state.activeTab !== tab) {
          this.setState({
            activeTab: tab
          });
        }
      }

    render() {
        return(
          <React.Fragment>
            <PageHeader title="Page Title - Account Settings"/>
            <Nav tabs>
              <NavItem>
                <NavLink
                  className = { this.state.activeTab === '1'? 'active' : '' }
                  onClick={() => { this.toggle('1'); }}
                >
                  User
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className = { this.state.activeTab === '2'? 'active' : '' }
                  onClick={() => { this.toggle('2'); }}
                >
                  Password
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className = { this.state.activeTab === '3'? 'active' : '' }
                  onClick={() => { this.toggle('3'); }}
                >
                  Account
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
                <ChangeName />
              </TabPane>
              <TabPane tabId="2">
                <ChangePassword />
              </TabPane>
              <TabPane tabId="3">
                <CloseAccount />
              </TabPane>
            </TabContent>
          </React.Fragment>
        );
    }
}

export default MyAccountView;