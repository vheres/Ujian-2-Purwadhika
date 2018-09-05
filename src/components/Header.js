import React, { Component } from 'react';
import { Nav, Navbar, NavItem, NavDropdown, Grid, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';
import { keepLogin, onLogout, cookieChecked } from '../actions';

var hello = "Hello, ";

class Header extends Component {
    onLogoutClick = () => {
        this.props.onLogout();
    }

    renderNavbar = () => {   
        if(this.props.auth.username !== "") {
            hello = "Hello, ";
            hello += this.props.auth.username;
            return(
                <Grid fluid>
                    <Row className="show-grid">
                        <Navbar fixedTop={true} inverse collapseOnSelect>
                        <Navbar.Header>
                            <Navbar.Brand>
                            <Link to="/">Cinema 95</Link>
                            </Navbar.Brand>
                            <Navbar.Toggle />
                        </Navbar.Header>
                        <Navbar.Collapse>
                            <Nav>
                            <NavItem eventKey={2}>
                                <Link to="/history">History</Link>
                            </NavItem>
                            </Nav>
                            <Nav pullRight>
                            <NavDropdown eventKey={1} title={hello} id="basic-nav-dropdown">
                                <Link to="/" onClick={this.onLogoutClick}><input type="button" className="btn btn-warning pull-right logout-button" onClick={this.onLogoutClick} value="logout"/></Link>
                            </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                        </Navbar>
                    </Row>
                </Grid>
            );
        }

        return(
            <Grid fluid className="no-margin">
                <Row className="show-grid">
                    <Navbar fixedTop={true} inverse collapseOnSelect>
                        <Navbar.Header>
                            <Navbar.Brand>
                                <Link to="/">Cinema 95</Link>
                            </Navbar.Brand>
                            <Navbar.Toggle />
                        </Navbar.Header>
                        <Navbar.Collapse>
                            <Nav>
                            <NavItem eventKey={2}>
                                <Link to="/history">History</Link>
                            </NavItem>
                            </Nav>
                            <Nav pullRight>
                            <NavItem eventKey={1}>
                                <Link to="/login">Login</Link>
                            </NavItem>
                            <NavItem eventKey={2}>
                                <Link to="/register">Register</Link>
                            </NavItem>
                            </Nav>
                        </Navbar.Collapse>
                        </Navbar>
                    </Row>
                </Grid>
        );
    }
    render() {
        return (
            this.renderNavbar()
    );
}
}

const mapStateToProps = (state) => {
    const auth = state.auth;

    return { auth };
}

export default connect(mapStateToProps, { onLogout })(Header);