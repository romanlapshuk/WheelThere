import React, {Component} from 'react';
import MapWrapper from './MapWrapper';
import NavHeader from '../../navheader';
import { Container, Row, Col } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import '../../App.css';
import firebase from "firebase"

export default class Submit extends Component {

  constructor(props) {
    super(props);


    this.state = {description: '',
                  address: '',
                  lat: 0,
                  lon: 0,
                  fun: 0,
                  bathroom: 0,
                  rollability: 0,
                  transport: 0,
                  tip: ''
                };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleLatChange = this.handleLatChange.bind(this);
    this.handleLonChange = this.handleLonChange.bind(this);
    this.handleFunChange = this.handleFunChange.bind(this);
    this.handleBathroomChange = this.handleBathroomChange.bind(this);
    this.handleRollabilityChange = this.handleRollabilityChange.bind(this);
    this.handleTransportChange = this.handleTransportChange.bind(this);
    this.handleTipChange = this.handleTipChange.bind(this);
  }

    this.postPin = this.postPin.bind(this);
  }

  handleDescriptionChange(event) {
      this.setState({description: event.target.value});
  }

  handleAddressChange(event) {
      this.setState({address: event.target.value});
  }
  handleLatChange(event) {
      this.setState({lat: event.target.value});
  }

  handleLonChange(event) {
      this.setState({lon: event.target.value});
  }

  handleFunChange(event) {
      this.setState({fun: event.target.value});
  }

  handleBathroomChange(event) {
      this.setState({bathroom: event.target.value});
  }

  handleRollabilityChange(event) {
      this.setState({rollability: event.target.value});
  }

  handleTransportChange(event) {
      this.setState({transport: event.target.value});
  }

  handleTipChange(event) {
      this.setState({tip: event.target.value});
  }
                // <Input type="Number" name="text" id="fun" placeholder="Fun" />
                // <Input type="Number" name="text" id="bathroom" placeholder="Bathroom" />
                // <Input type="Number" name="text" id="rollability" placeholder="Rollability" />
                // <Input type="Number" name="text" id="transport" placeholder="Transport"/>

  postPin(event) {
    const db = firebase.firestore();
    db.collection('pins').doc()

    firebase.database().ref('pins/').set({
      description: this.state.description,
      address: this.state.address,
      lat: this.state.lat,
      lon: this.state.lon,
      fun: this.state.fun,
      bathroom: this.state.bathroom,
      rollability: this.state.rollability,
      transport: this.state.transport,
      tip: this.state.tip
    });
    event.preventDefault();
  }



  render() {
    return (

    	<div>

        <NavHeader/>

        <Row>
          <Col xs = "4"></Col>
          <Col xs = "4">
            <Form onsubmit={this.postPin}>
              <FormGroup>
                <Label for="Description">Description</Label>
                <Input type="textarea" name="text" id="Description" value={this.state.description} onChange={this.handleDescriptionChange}/>
              </FormGroup>

              <FormGroup>
                <Label for="Address">Address</Label>
                <Input type="textarea" name="text" id="Address" value={this.state.address} onChange={this.handleAddressChange}/>
              </FormGroup>

              <FormGroup>
                <Label for="Lat">Lat</Label>
                <Input type="Number" name="text" id="Lat" value={this.state.lat} onChange={this.handleLatChange}/>
              </FormGroup>

              <FormGroup>
                <Label for="Lon">Lon</Label>
                <Input type="Number" name="text" id="exampleText" value={this.state.lon} onChange={this.handleLonChange}/>
              </FormGroup>

              <FormGroup>
                <Label for="Access">Accessibility</Label>
                <Input type="Number" name="text" id="fun" placeholder="Fun" value={this.state.fun} onChange={this.handleFunChange}/>
                <Input type="Number" name="text" id="bathroom" placeholder="Bathroom" value={this.state.bathroom} onChange={this.handleBathroomChange}/>
                <Input type="Number" name="text" id="rollability" placeholder="Rollability" value={this.state.rollability} onChange={this.handleRollabilityChange}/>
                <Input type="Number" name="text" id="transport" placeholder="Transport" value={this.state.transport} onChange={this.handleTransportChange}/>
              </FormGroup>

              <FormGroup>
                <Input type="textarea" name="tip" id ="tip" placeholder="Any tips?" value={this.state.tip} onChange={this.handleTipChange}/>
              </FormGroup>

            </Form>
          </Col>
          <Col xs = "4"></Col>
        </Row>

      </div>
    );
  }
}
// <Col xs = "2">
// Left panel
// </Col>
// <Col xs = "10">
//
// </Col>

// <Col xs = "10" style = {{width:'100vw', height:'100vh'}}>
//  	 		<MapWrapper/>
// </Col>