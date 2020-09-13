import React from 'react';
import { Col, Row, Form, FormGroup, Input, Label, Button } from 'reactstrap';
import { dateNumber, month, year } from "../../common/const";
import "./Booking.css";

class Booking extends React.Component {
    constructor(props) {
        super(props);
    }

    renderDate = (dateData) => {
        return(
            dateData.map((d) => <option key={d} value={d}>{d}</option>)
        )
    }

    render() {
        let yearArray = year;
        for (let i=2020; i>=1990; i--) {
            yearArray.push(i);
        }
        return <Row className="mt-3">
            <Col md="4" className="container mr-5 pr-5">
                <div>
                    <h4>Your Details</h4>
                    <Form>
                        <FormGroup>
                            <Input type="text" name="fname" id="firstName" placeholder="First name" />
                        </FormGroup>
                        <FormGroup>
                            <Input type="text" name="lname" id="lastName" placeholder="Last name" />
                        </FormGroup>
                        <FormGroup className="ml-2">
                            <Label for="dob">Date of birth:</Label>
                            <Row>
                                <Col xs="3">
                                    <Input type="select" name="date" id="date">
                                        {this.renderDate(dateNumber)}
                                    </Input>
                                </Col>
                                <Col xs="4">
                                    <Input type="select" name="month" id="month">
                                        {this.renderDate(month)}
                                    </Input>
                                </Col>
                                <Col xs="4">
                                    <Input type="select" name="year" id="year">
                                        {this.renderDate(yearArray)}
                                    </Input>
                                </Col>
                            </Row>                            
                        </FormGroup>
                        <FormGroup tag="fieldset" className="d-flex">
                            <Label>Gender:</Label>
                            <FormGroup check>
                                <Label check>
                                    <Input type="radio" name="radio1" />
                                    Male
                                </Label>
                            </FormGroup>
                            <FormGroup check>
                            <Label check>
                                <Input type="radio" name="radio1" />
                                Female
                            </Label>
                            </FormGroup>
                            <FormGroup check>
                            <Label check>
                                <Input type="radio" name="radio1" />
                                Other
                            </Label>
                            </FormGroup>
                        </FormGroup>
                        <FormGroup>
                            <Input
                             type="email"
                             name="email"
                             id="email"
                             placeholder="E-mail(booking info will be sent to this address)" />
                        </FormGroup>
                        <FormGroup>
                            <Input type="text" name="pnumber" id="pnumber" placeholder="Phone number" />
                        </FormGroup>
                    </Form>
                </div>
                <div className="mt-3">
                    <p><strong>Address</strong></p>
                    <Form>
                        <FormGroup>
                            <Input type="text" name="address" id="address" placeholder="Enter your address" />
                        </FormGroup>
                        <FormGroup>
                            <Input type="text" name="streetAddress" id="streetAddress" placeholder="Street address" />
                        </FormGroup>
                        <FormGroup>
                            <Input type="text" name="city" id="city" placeholder="City or Town" />
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col xs="6">
                                    <Input type="text" name="country" id="country" placeholder="Country" />
                                </Col>
                                <Col xs="6">
                                    <Input type="text" name="pCode" id="pCode" placeholder="Post code" />
                                </Col>
                            </Row>    
                        </FormGroup>
                        <FormGroup>
                            <Input type="text" name="country" id="country" placeholder="Country" />
                        </FormGroup>
                        <Button outline className="addPassenger">
                            <div className="row mx-auto">
                            <i className="material-icons addIcon">
                            add_circle_outline</i>
                            <p className="my-auto">&nbsp; Add another passenger</p></div>
                        </Button>
                    </Form>
                </div>
            </Col>
            <Col md="6" className="container mr-5 pr-5">
                <Col md="12" className="container">
                    <p>Booking</p>
                    <h3 id="packageTitle"><strong></strong></h3>
                </Col>
                <Col md="12" className="container">
                    <p>Pick a <strong>start date</strong></p>
                    <input type="date" id="startDate" name="date" placeholder=""/>
                </Col>
                <Col md="6" className="">
                    <h3>Customisations: </h3>
                    <Input type="textarea" name="text" id="customisations" rows="10"
                    placeholder="Here you can request to change your adventure around. You could ask to drop some activities, extend the dates at a certain accomodation etc."/>           
                </Col>
                <Col md="6" class="container">
                    <label for="bookingRequest">Approximate Price per Person: £ Too Much, </label>
                    <Button class="btn btn-primary" id="bookingRequest" name="bookingRequest" type="submit">
                        <div class="row mx-auto">
                        <i class="material-icons addIcon">work</i>
                        <p class="my-auto">&nbsp; Request Booking</p></div></Button>
                </Col>          
            </Col>
        </Row>
      }
}

export default Booking;
