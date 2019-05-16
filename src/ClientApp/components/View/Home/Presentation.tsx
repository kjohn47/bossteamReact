import * as React from 'react';
import {Jumbotron} from 'reactstrap';
import {Ipresentation} from '../../../interfaces/home';

class Presentation extends React.PureComponent<Ipresentation,{}>{
    render(){
        return(
            <Jumbotron>
                <h1 className="display-3">{this.props.presentationData.title}</h1>
                <p className="lead">{this.props.presentationData.introduction}</p>
                <hr className="my-2" />
                <p>{this.props.presentationData.description}</p>
            </Jumbotron>
        );
    }
}
export default Presentation;
