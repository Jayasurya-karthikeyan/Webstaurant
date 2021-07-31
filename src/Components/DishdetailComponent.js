import React, { Component } from "react";
import { Card, CardImg, CardText, 
  CardBody, CardTitle } from "reactstrap";

  class DishDetail extends Component {
    constructor(props) {
      super(props);
  
//       this.state = {
//         selectedDish: null
//       }
    }

  render(dish){
    if (dish != null){

      const commentugal = dish.comments.map((commentoda) => {
        return(
          <div key={commentoda.id}>
          <div>{commentoda.comment}</div>
          <div> --{commentoda.author}, {commentoda.date}</div>
          </div>
        );
      })

      return(
        <div className="row m-3">
          <Card className="col-12 col-md-5 m-1 p-0">
                <CardImg width="100%" object src={dish.image} alt={dish.name} />
                <CardTitle className="px-3" heading><h4>{dish.name}</h4></CardTitle>
                <CardBody>
                  <CardText>{dish.description}</CardText>
                </CardBody>
          </Card>
          <div className="row col-12 m-3 col-sm-6">
              <h3>Comments</h3>
              <h6>{commentugal}</h6>
          </div>
        </div>

        );
    }
    else{
      return(
        <div></div>
      );
    }
  }
}
  
  export default DishDetail;
  