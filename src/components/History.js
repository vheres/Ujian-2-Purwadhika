import React, { Component } from 'react';
import { Grid, Row, Col, PageHeader, Table } from 'react-bootstrap';
import { API_URL_1 } from '../supports/api-url/apiurl';
import axios from 'axios';
import { connect } from 'react-redux';
import MyBookDetail from './MyTransactionDetail';
import { Redirect } from 'react-router-dom';

class History extends Component {   
    state = { items: [] }

    componentWillMount() {
        this.getTransactionList();
    }

    getTransactionList() {
        axios.get(API_URL_1 + "/transaction", {
            params: {
                user: this.props.auth.username,
            }
            }).then(item => {
                this.setState({ items: item.data})
            }).catch((err) => {
                console.log(err);
            })
    }

    renderItemList = () => {
        return this.state.items.map(item =>
            <MyBookDetail key={item.id} User={item.user} Studio={item.studio} Time={item.time} Price={item.price} Seats={item.seats}>
            </MyBookDetail>
        )
    }  

    render() {
        if (this.props.auth.username != "") {
        return(
        <Grid fluid>
            <Row>
                <Col xs={2}>
                </Col>
                <Col xs={8}>
                    <PageHeader>
                    Transaction History
                    </PageHeader>
                </Col>
            </Row>
            <Row>
                <Col xs={3}>
                </Col>
                <Col xs={6}>
                    <Grid fluid>
                        <Row>
                            <Table responsive>
                                <thead>
                                    <tr>
                                    <th>User</th>
                                    <th>Studio</th>
                                    <th>Time</th>
                                    <th>Price</th>
                                    <th>Seats</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderItemList()}
                                    <tr>
                                    </tr>
                                </tbody>
                            </Table>
                        </Row>
                    </Grid>
                </Col>
            </Row>
            <hr />
        </Grid>
        );
    }
    return <Redirect to="/login"/>
}
}

const mapStateToProps = (state) => {
    const auth = state.auth;

    return { auth };
}

export default connect(mapStateToProps, )(History);