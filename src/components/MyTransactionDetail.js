import React, { Component } from 'react';
import axios from 'axios';
import { API_URL_1 } from '../supports/api-url/apiurl'

class MyTransactionDetail extends Component {
    render() {
        return (
                <tr>
                    <td>
                        {this.props.User}
                    </td>
                    <td>
                        {this.props.Studio}
                    </td>
                    <td>
                        {this.props.Time}
                    </td>
                    <td>
                        {this.props.Price}
                    </td>
                    <td>
                        {this.props.Seats}
                    </td>
                </tr>
        );
    }
}

export default MyTransactionDetail;

