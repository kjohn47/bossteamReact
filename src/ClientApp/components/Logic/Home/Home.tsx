import * as React from 'react';
import { Istore } from '../../../interfaces/store';
import {IAppSettings} from '../../../interfaces/appSettings';
import {connect} from 'react-redux';
import {Ipresentation, IHomeRedux, IHomeActions} from '../../../interfaces/home';
import { changePresentationLanguage, getHomeData, resetHomeData } from '../../../store/actions/home';
import { Row, Col } from 'reactstrap';
import { Iimage } from '../../../interfaces/common';

type IpresentationReduxProps = IAppSettings & IHomeActions & IHomeRedux;

function homeLogic (HomePresentation:React.ComponentType<Ipresentation>,HomeImage:React.ComponentType<Iimage>)
{
    class HomeLogic extends React.Component<IpresentationReduxProps,{}>{

        componentWillUnmount(){
            this.props.resetHomeData();
        }

        componentDidMount(){
            this.props.getHomeData(this.props.presentationLanguage);
        };

        componentDidUpdate(prevProps: IpresentationReduxProps) {
            // Typical usage (don't forget to compare props):
            if (this.props.presentationLanguage !== prevProps.presentationLanguage ) {
                this.props.changePresentationLanguage(this.props.presentationLanguage);
            }
        };

        render(){
            const presentation = this.props.presentationData;
            const homeImage = this.props.image;
            return(
                <Row>
                    <Col md="4" sm="12" className="HomeImageDiv">
                        <HomeImage alt={homeImage.alt} link={homeImage.link} src= {homeImage.src} className = "HomePageImage"/>
                    </Col>
                    <Col md="8" sm="12">
                        <HomePresentation presentationData = {presentation} />
                    </Col>
                </Row>
            );
        }
    }
    const mapStateToProps = (state:Istore) => {
        return {
            presentationLanguage: state.appSettings.presentationLanguage,
            presentationData: state.home.presentationData,
            image: state.home.image
         };
    };

    const mapDispatchToProps = (dispatch:Function) => ({
        getHomeData: (language: string) => dispatch(getHomeData(language)),                
        changePresentationLanguage: (language: string) => dispatch(changePresentationLanguage(language)),
        resetHomeData: () => dispatch(resetHomeData())
      });
    return connect(mapStateToProps, mapDispatchToProps)(HomeLogic);
}

export default homeLogic;