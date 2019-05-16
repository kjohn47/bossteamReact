import * as React from 'react';
import {Iimage} from '../../../interfaces/common';
import {IHomeActions, IHomeRedux} from '../../../interfaces/home';
import {Istore} from '../../../interfaces/store';
import {getHomeImage} from '../../../store/actions/home';
import {connect} from 'react-redux';

type IImageRedux = IHomeActions & IHomeRedux;

function homeImageLogic (WrappedComponent:React.ComponentType<Iimage>)
{
    class HomeImage extends React.Component<IImageRedux,{}>{
        componentDidMount(){
            this.props.getHomeImage();
        };
        render(){
            const image = this.props.image;
            return(
                <WrappedComponent alt={image.alt} link={image.link} src= {image.src} className = "HomePageImage"/>
            );
        }
    }    
    
    const mapDispatchToProps = ( dispatch:Function ) => {
        return {
            getHomeImage: () => dispatch(getHomeImage())
        };
    };

    const mapStateToProps = ( state: Istore ) => {
        return {
            image: state.home.image
        }
    };

    return connect(mapStateToProps, mapDispatchToProps)(HomeImage);
}

export default homeImageLogic;