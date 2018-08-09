import React, {Component} from 'react';
import PropTypes from 'prop-types';
import SpeechRecognition from 'react-speech-recognition'
import AddMap from '../AddMap/AddMap'
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button
} from 'reactstrap';

import {Input} from 'reactstrap';
import {FaBeer, FaAccessibleIcon, FaGooglePlusSquare} from 'react-icons/fa';

import $ from 'jquery';
import AuthUserContext from '../../components/auth/AuthUserContext';
import * as firebase from "firebase";

const propTypes = {
  // Props injected by SpeechRecognition
  transcript: PropTypes.string,
  resetTranscript: PropTypes.func,
  browserSupportsSpeechRecognition: PropTypes.bool
};

class NavHeader extends Component {
  constructor() {
    super();
    this.toggleMapModal = this.toggleMapModal.bind(this);
    this.state = {
      modal: false
    }
    this.addMapAndResetVoiceCmd = this.addMapAndResetVoiceCmd.bind(this);
    this.myAccountAndResetVoiceCmd = this.myAccountAndResetVoiceCmd.bind(this);

    }

  toggleMapModal() {
    //e.preventDefault();
    console.log("MAPPP");
    this.setState({
      modal: true
    });
  }

  addMapAndResetVoiceCmd(reset){
    this.toggleMapModal();
    reset()
  }

  myAccountAndResetVoiceCmd(reset, user){
    window.location.assign("/myaccount/" + user.uid);
    reset()
  }

  getUserName = (curUserId) => {
    const db = firebase.firestore();
    const userRef = db.collection('users').doc(curUserId);
    userRef.get().then((user) => {
      this.setState({
        firstName: user.data().first_name
      });
    });
  };

    render()
    {
      const {transcript, resetTranscript, listening, startListening, stopListening, browserSupportsSpeechRecognition } = this.props;


      if (!browserSupportsSpeechRecognition) {
        return null
      }

      return (

            <Navbar className="drop-shadow" color="light" light expand="md">
              <NavbarBrand href="/" className="mr-auto">
                <img style={{width: '30px', height: '30px'}}
                     src="https://s3-us-west-2.amazonaws.com/badhorserecords/WheelthereIcon2.png"/>
                wheelthere
              </NavbarBrand>
              {transcript.search("map") < 0 ? "" : this.addMapAndResetVoiceCmd(resetTranscript)}
              <Nav navbar>
                <NavItem>
                  <Input className="searchBar" type="search" name="searc" id="searchBar" placeholder="search"/>
                </NavItem>
                <NavItem>
                  <NavLink onClick={this.toggleMapModal}>Add map</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink>Messages</NavLink>
                </NavItem>
                <AuthUserContext.Consumer>
                  {authUser => authUser
                      ? <NavItem>
                        {transcript.search("account") < 0 ? "" : this.myAccountAndResetVoiceCmd(resetTranscript,authUser)}
                        <NavLink href={"/myaccount/" + authUser.uid}>Account</NavLink>
                      </NavItem>
                      : <NavItem></NavItem>
                  }
                </AuthUserContext.Consumer>


                <AuthUserContext.Consumer>
                  {authUser => authUser
                      ? <NavItem>
                        {this.getUserName(authUser.uid)}
                        <NavLink>Welcome {this.state.firstName}!</NavLink>
                      </NavItem>
                      : <NavItem>
                        <NavLink href={"/login/"}>Log In</NavLink>
                      </NavItem>
                  }
                </AuthUserContext.Consumer>

                <AuthUserContext.Consumer>
                  {authUser => authUser
                      ? <div>
                        <NavItem>
                          <NavLink onClick={() => firebase.auth().signOut()}>Sign Out</NavLink>
                          <AddMap modal={this.state.modal} userId={authUser.uid}/>
                        </NavItem>
                      </div>
                      : <NavItem>
                        <NavLink href={"/signup/"}>Sign Up</NavLink>
                      </NavItem>
                  }
                </AuthUserContext.Consumer>


              </Nav>
            </Navbar>


      );
    }
}
NavHeader.propTypes = propTypes;
export default SpeechRecognition(NavHeader);


