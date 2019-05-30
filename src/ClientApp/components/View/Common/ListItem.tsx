import * as React from 'react';
import CardItem from './CardItem';
import { ICardItem } from '../../../interfaces/common';



class NewsList extends React.PureComponent<ICardItem,{}>{
    render(){
        return(
            <div className = "col-lg-4 col-md-6 col-xs-12 pb-3">
                <CardItem data={this.props.data}/>
            </div>
        )}
}
export default NewsList;
