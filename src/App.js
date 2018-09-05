import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import './App.css';
import Header from './components/Header';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import History from './components/History';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';
import { keepLogin, onLogout, cookieChecked } from './actions';
import { withRouter } from 'react-router-dom'


import { Route } from 'react-router-dom';
import './supports/css/bootstrap.css';

const cookies = new Cookies();

class App extends Component {
  componentWillMount() {
    const theCookie = cookies.get('myCookie');
    if(theCookie !== undefined) {
        this.props.keepLogin(theCookie);
    } 
    else {
        this.props.cookieChecked();
    }
    console.log(this.props.auth);
    }

    componentWillReceiveProps(newProps) {
        if(newProps.auth.username === "") {
            cookies.remove('myCookie');
        }
    }

  render() {
    if (this.props.auth.cookieCheck === true) {
      return (
        <Grid fluid>
          <Row>
            <Col cs={12}>
              <Header />
              <br />
              <br />
              <br />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
             <Route exact path="/" component={HomePage}/>
             <Route path="/login" component={LoginPage}/>
             <Route path="/register" component={RegisterPage}/>
             <Route path="/history" component={History}/>
            </Col>
          </Row>
        </Grid>
      );
    }
    else {
      return <div>Authentication Checking</div> 
    }  
  }
}

const mapStateToProps = (state) => {
  const auth = state.auth;

  return { auth };
}

export default withRouter(connect(mapStateToProps, { onLogout, keepLogin, cookieChecked })(App))
