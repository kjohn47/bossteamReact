import * as React from 'react';
import CardItem from '../Common/CardItem';
import { InewsCard } from '../../../interfaces/news';



class NewsList extends React.PureComponent<InewsCard,{}>{
    render(){
        const newsCard = this.props.newsCard;
        return(
            <div className = "col-lg-4 col-md-6 col-xs-12 pb-3">
                <CardItem data={newsCard}/>
            </div>
        )}
}
export default NewsList;
