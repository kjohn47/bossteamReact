import * as React from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button } from 'reactstrap';
import {ICardItem} from '../../../interfaces/common';
import {NavLink as RouterLink} from 'react-router-dom';

const defaultImageLink = "imgLink: images/318x180.png";


class CardItem extends React.PureComponent<ICardItem,{}>{
    render(){
        const data = this.props.data;
        return(
            <Card outline = {data && data.outlineColor? true : false}  color={data? data.outlineColor : ''}>
              <CardImg top width="100%" src= {data ? data.imgLink ? data.imgLink : defaultImageLink : defaultImageLink} alt="Card image cap" />
              <CardBody>
                <CardTitle>{data ? data.title : "Item title"}</CardTitle>
                <CardSubtitle>{data ? data.date : "Item Date"}</CardSubtitle>
                <CardText>{data ? data.description : "Item Short Description"}</CardText>
                <RouterLink to = {data ? data.buttonLink : '#'}><Button>{data ? data.buttonText : "Button"}</Button></RouterLink>
              </CardBody>
            </Card>
        );
    }
}
export default CardItem;
