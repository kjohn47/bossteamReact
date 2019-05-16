import * as React from 'react';
import {Iimage} from '../../../interfaces/common';

const defaultImageLink = "images/480x360.png";

class ImageWithLink extends React.PureComponent<Iimage,{}>
{
    render() {
        return (
            <div>
                <a href={this.props.link}>
                    <img src={this.props.src !== "" ? this.props.src : defaultImageLink} alt={this.props.alt} width={this.props.width ? this.props.width + 'px' : '100%'} className={this.props.className ? this.props.className : ''}/>
                </a>
            </div>
        );
    }
}

class ImageWithoutLink extends React.PureComponent<Iimage,{}>
{
    render() {
        return (
            <div>
                <img src={this.props.src !== "" ? this.props.src : defaultImageLink} alt={this.props.alt} width={this.props.width ? this.props.width + 'px' : '100%'} className={this.props.className ? this.props.className : ''}/>
            </div>
        );
    }
}

class Image extends React.PureComponent<Iimage,{}>{
    
    render(){
        let withoutLink:boolean = this.props.link === "" || this.props.link === null || this.props.link === undefined;
        return(
            withoutLink ? 
                <ImageWithoutLink alt = {this.props.alt} src = {this.props.src} width = {this.props.width} className={this.props.className} link={this.props.link}/>
            :
                <ImageWithLink alt = {this.props.alt} src = {this.props.src} width = {this.props.width} className={this.props.className} link={this.props.link}/>
        );
    }
}
export default Image;
