import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  BreadcrumbItem,
  Breadcrumb,
  Button,
  Col,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from "react-redux-form";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || (val.length <= len);
const minLength = (len) => (val) => !val || (val.length >= len);

class CommentForm extends Component{
  constructor(props){
    super(props);
    this.toggleModal = this.toggleModal.bind(this);
    this.state={
      isModalOpen: false,
    }
  }
  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }
  handleSubmit(values) {
    console.log("Current State is: " + JSON.stringify(values));
    alert("Current State is: " + JSON.stringify(values));
  }
  render(){
    return(
      <div>
          <Button
            outline
            className="btn btn-primary"
            onClick={this.toggleModal}
          >
            <span className="fa fa-pencil fa-lg"></span> Submit Comment
          </Button>

          <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}> Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <Row className="form-group">
                <Label htmlFor="firstName" md={2}>
                  Rating
                </Label>
                <Col md={10}>
                  <Control.select
                    model=".rating"
                    name="rating"
                    className="form-control"
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option> 
                  </Control.select>
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="lastName" md={2}>
                  Author
                </Label>
                <Col md={10}>
                  <Control.text
                    model=".author"
                    className="form-control"
                    id="author"
                    name="author"
                    placeholder="Author Name"
                    validators={{
                      required,
                      minLength: minLength(3),
                      maxLength: maxLength(15),
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".author"
                    show="touched"
                    messages={{
                      requires: "Required field",
                      minLength: "Must be greater than 2 characters",
                      maxLength: "Must not be greater than 15 characters",
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="message" md={2}>
                  Comments
                </Label>
                <Col md={10}>
                  <Control.textarea
                    model=".comments"
                    id="comments"
                    name="comments"
                    rows="6"
                    className="form-control"
                  ></Control.textarea>
                </Col>
              </Row>
              <Row className="form-group">
                <Col md={{ size: 10, offset: 2 }}>
                  <Button type="submit" color="primary">
                    Submit Comment
                  </Button>
                </Col>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

function RenderDish({ dish }) {
  return (
    <Card className="col-12 col-md-5 m-1 p-0">
      <CardImg width="100%" object src={dish.image} alt={dish.name} />
      <CardTitle className="px-3">
        <h4>{dish.name}</h4>
      </CardTitle>
      <CardBody>
        <CardText>
          <p>{dish.description}</p>
        </CardText>
      </CardBody>
    </Card>
  );
}


function RenderComments({ comments }) {  
  
  if (comments != null) {
    const commentugal = comments.map((commentoda) => {
      return(
      <div key={commentoda.id}>
        <div>{commentoda.comment}</div>
        <div>
          &nbsp; --{commentoda.author}, &nbsp;
          {new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
          }).format(new Date(Date.parse(commentoda.date)))}
        </div>
      </div>
      );
    });
    return (
      <div className="col-12 col-md-5 m-1">
        <h4>Comments</h4>
        <ul className="list-unstyled">{commentugal}</ul>
        <CommentForm />
      </div>
    );
  } else {
    return <div></div>;
  }

}


const DishDetail = (props) => {
  if (props.dish != null) {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/menu">Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <RenderDish dish={props.dish} />
          <RenderComments comments={props.comments} />
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default DishDetail;
