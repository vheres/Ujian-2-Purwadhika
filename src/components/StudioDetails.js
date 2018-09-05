import React, { Component } from 'react';
import { Col, Row, MenuItem, } from 'react-bootstrap';


class StudioDetails extends Component {
    render() {
                return (             
                    <Row>
                        {/* <MenuItem onClick={this.props.StudioClick}>{this.props.Time}</MenuItem> */}
                        <input type="button" className="btn btn-primary margin-left-15" onClick={this.props.StudioClick} value={this.props.Time} style={{width: 158}}/>
                    </Row>
                );
            }
        }      

export default StudioDetails;

