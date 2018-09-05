import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';

class SeatDetails extends Component {
    state = { button: false, booked: [] }

    componentWillMount() {
        this.setState({booked:this.props.status})
    }

    Toggle(status, fn) {
        this.setState({ button: status});
        fn(this.props.Ind);
    }

    render() {
        if (this.props.Num % 9 === 0 && this.props.Num !== 0) {
            if (this.state.booked === true) {
                return (
                    <Col xs={3} >
                            <Row>
                            <input className="btn btn-danger" style={{width:50}} text-align="right" type="button" value={this.props.Alp + (this.props.Num + 1)} disabled/>
                            </Row>
                    </Col>
                );
            }
            else {
                if (this.state.button === false) {
                    return (
                        <Col xs={3} >
                                <Row>
                                <input className="btn btn-primary" style={{width:50}} text-align="right" type="button" value={this.props.Alp + (this.props.Num + 1)} onClick={() => this.Toggle(true, this.props.BookClick)}/>
                                </Row>
                        </Col>
                    );
                }
                else if (this.state.button === true) {
                    return (
                        <Col xs={3} >
                                <Row>
                                <input className="btn btn-warning" style={{width:50}} text-align="right" type="button" value={this.props.Alp + (this.props.Num + 1)} onClick={() => this.Toggle(false, this.props.CancelClick)}/>
                                </Row>
                        </Col>
                    );
                }
            }
        }
        else {
            if (this.state.booked === true) {
                return (
                    <Col xs={1} >
                            <Row>
                            <input className="btn btn-danger" style={{width:50}} text-align="right" type="button" value={this.props.Alp + (this.props.Num + 1)} disabled/>
                            </Row>
                    </Col>
                );
            }
            else {
                if (this.state.button === false) {
                    return (
                        <Col xs={1} >
                                <Row>
                                <input className="btn btn-primary" style={{width:50}} text-align="right" type="button" value={this.props.Alp + (this.props.Num + 1)} onClick={() => this.Toggle(true, this.props.BookClick)}/>
                                </Row>
                        </Col>
                    );
                }
                else if (this.state.button === true) {
                    return (
                        <Col xs={1} >
                                <Row>
                                <input className="btn btn-warning" style={{width:50}} text-align="right" type="button" value={this.props.Alp + (this.props.Num + 1)} onClick={() => this.Toggle(false, this.props.CancelClick)}/>
                                </Row>
                        </Col>
                    );
                }
            }
        }
        
    }
}

export default SeatDetails;

