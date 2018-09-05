import React, {Component} from 'react'
import axios from 'axios'
import { API_URL_1 } from '../supports/api-url/apiurl';
import {connect} from 'react-redux'
import { Grid, Row, Col, PageHeader, Carousel, NavDropdown, DropdownButton, ButtonToolbar } from 'react-bootstrap';
import StudioDetails from './StudioDetails';
import SeatDetails from './SeatDetails';
// import { Carousel } from 'react-responsive-carousel';

const INITIAL_STATE = {schedule: [], time : "", seats: [], studio: "", price: 0, id: 0, film: "", pick: undefined, movie: undefined}

var initPrice = 0;
var tempPrice = 0;
var totalPrice = 0;

class HomePage extends Component{
      
    state = {schedule: [], time : "", seats: [], studio: "", price: 0, id: 0, film: "", pick: undefined, movie: undefined, movielist: [], moviedesc: [], movietitle: []}

    componentWillMount() {
        this.onBackClick();
        this.getMovieList();
    }

    onStudioClick = (param) => {
        this.setState({seats: []})
        if (this.props.auth.username !== "") {
            this.setState({pick: param.id})
            axios.get(API_URL_1 + '/schedule/' + param.id)
            .then(item => {
                initPrice = 0;
                for ( var i = 0; i < item.data.seats.length; i++) {
                    if(item.data.seats[i] === true) {
                        initPrice++
                    }
                }
                this.setState({ seats: item.data.seats, time: item.data.time, studio: item.data.studio, price: item.data.price, id: item.data.id, film: item.data.movie})             
            })
            .catch((err) => {
                console.log(err);
            })
        }
        else {
            alert("Your are not logged in!")
            this.props.history.push('/login');
        }
        
    }

    onConfirmClick = () => {
        axios.post(API_URL_1 + '/transaction', {
            user: this.props.auth.username,
            studio: this.state.studio,
            time: this.state.time,
            price: totalPrice,
            seats: tempPrice - initPrice,
        })
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        })

        axios.put(API_URL_1 + '/Schedule/' + this.state.id,{
            id: this.state.id,
            studio: this.state.studio,
            movie: this.state.film,
            time: this.state.time,
            price: this.state.price,
            seats: this.state.seats
        })
        .then((response) => {
            console.log(response);
            alert("Total Price: " + totalPrice)
            this.setState({...INITIAL_STATE})
            this.props.history.push('/history')
        })
        .catch((err) => {
            console.log(err);
        })
    }

    onBackClick = () => {
        this.setState({...INITIAL_STATE})
    }

    //TOGGLE ON SeatDetails
    onBookClick = (index) => { 
        this.state.seats[index] = true;
        this.setState({});
    }
    //TOGGLE OFF SeatDetails
    onCancelClick = (index) => {
        this.state.seats[index] = false;
        this.setState({});
    }

    renderSeatList = () => {
        var num = 0;
        var ind = 0;
        var alp = 'A';
        console.log(this.state.seats);
        return this.state.seats.map((item) =>
        <SeatDetails status={item} Num={num} Ind={ind} Alp={alp} BookClick={(number)=>this.onBookClick(number)} CancelClick={(number)=>this.onCancelClick(number)}>
            {num++}
            {ind++}
            {num%10===0?alp = String.fromCharCode(alp.charCodeAt() + 1):null}
            {num%10===0?num=0:null}
        </SeatDetails>
    )
    }

    renderScheduleList = () => {
        return this.state.movie.map((item) => 
            <StudioDetails key={item.id} Time={item.time} StudioClick={()=>this.onStudioClick(item)}></StudioDetails>
        )
    }

    onMovieClick = (film) => {
        axios.get(API_URL_1 + '/schedule', {
            params: {
                movie: film
            }
        }).then(item => {
            this.setState({ movie: item.data})
        }).catch((err) => {
            console.log(err);
        })
    }

    getMovieList =() => {
        axios.get(API_URL_1 + '/movies')
            .then(item => {
                this.setState({ movietitle: [item.data[0].title, item.data[1].title, item.data[2].title], movielist: [item.data[0].link, item.data[1].link, item.data[2].link], moviedesc: [item.data[0].desc, item.data[1].desc, item.data[2].desc]})
            })
            .catch((err) => {
                console.log(err);
            })
    }

    renderMovieList = () => {
        return (
        <Carousel>
            <Carousel.Item>
                <img width={1280} height={500} alt={this.state.movietitle[0]} src={this.state.movielist[0]} onClick={() => this.onMovieClick("Avengers")}/>
                <Carousel.Caption>
                <h3>{this.state.movietitle[0]}</h3>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img width={1280} height={500} alt={this.state.movietitle[1]} src={this.state.movielist[1]} onClick={() => this.onMovieClick("Hacksaw Ridge")}/>
                <Carousel.Caption>
                <h3>{this.state.movietitle[1]}</h3>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img width={1280} height={500} alt={this.state.movietitle[2]} src={this.state.movielist[2]} onClick={() => this.onMovieClick("Justice League")}/>
                <Carousel.Caption>
                <h3>{this.state.movietitle[2]}</h3>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
        )
    }

    renderMovieDetail = (item) => {
        if (item === "Avengers") {
        return (
            <Row>
                <Col xs={4}>
                <img width={350} src={this.state.movielist[0]}></img>
                </Col>
                <Col xs={4}>
                <Row>
                    <h2>{this.state.movietitle[0]}</h2>
                    <p>{this.state.moviedesc[0]}</p>
                </Row>
                <Row>
                    <Col xs={4}>
                        <a href="https://www.imdb.com/title/tt4154756/" target="_blank"><input className="btn btn-warning" style={{width:120}} text-align="right" type="button" value="IMDB"/></a>
                    </Col>
                    <Col xs={4}>
                    <ButtonToolbar>
                        <DropdownButton  title="Schedule" bsStyle={'primary'} title={'Schedule'} style={{width:120}}>
                            {this.renderScheduleList()}
                        </DropdownButton>
                        </ButtonToolbar>
                    </Col>
                    <Col xs={4}>
                    <input className="btn btn-danger" text-align="right" type="button" value="BACK" onClick={()=>this.onBackClick()} style={{width:120}}/>
                    </Col>
                </Row>
                </Col>
            </Row>
        )
        }
        else if (item === "Hacksaw Ridge") {
            return (
                <Row>
                <Col xs={4}>
                <img width={350} src={this.state.movielist[1]}></img>
                </Col>
                <Col xs={4}>
                <Row>
                    <h2>{this.state.movietitle[1]}</h2>
                    <p>{this.state.moviedesc[1]}</p>
                </Row>
                <Row>
                    <Col xs={4}>
                        <a href="https://www.imdb.com/title/tt2120032/?ref_=nv_sr_1" target="_blank"><input className="btn btn-warning" style={{width:120}} text-align="right" type="button" value="IMDB"/></a>
                    </Col>
                    <Col xs={4}>
                    <ButtonToolbar>
                        <DropdownButton  title="Schedule" bsStyle={'primary'} title={'Schedule'} style={{width:120}}>
                            {this.renderScheduleList()}
                        </DropdownButton>
                        </ButtonToolbar>
                    </Col>
                    <Col xs={4}>
                    <input className="btn btn-danger" text-align="right" type="button" value="BACK" onClick={()=>this.onBackClick()} style={{width:120}}/>
                    </Col>
                    
                </Row>
                </Col>
            </Row>
            )
        }
        else if (item === "Justice League") {
            return (
                <Row>
                <Col xs={4}>
                <img width={350} src={this.state.movielist[2]}></img>
                </Col>
                <Col xs={4}>
                <Row>
                    <h2>{this.state.movietitle[2]}</h2>
                    <p>{this.state.moviedesc[2]}</p>
                </Row>
                <Row>
                    <Col xs={4}>
                        <a href="https://www.imdb.com/title/tt0974015/?ref_=fn_al_tt_1" target="_blank"><input className="btn btn-warning" style={{width:120}} text-align="right" type="button" value="IMDB"/></a>
                    </Col>
                    <Col xs={4}>
                        <ButtonToolbar>
                        <DropdownButton  title="Schedule" bsStyle={'primary'} title={'Schedule'} style={{width:120}}>
                            {this.renderScheduleList()}
                        </DropdownButton>
                        </ButtonToolbar>
                    </Col>
                    <Col xs={4}>
                    <input className="btn btn-danger" text-align="right" type="button" value="BACK" onClick={()=>this.onBackClick()} style={{width:120}}/>
                    </Col>
                </Row>
                </Col>
            </Row>
            )
        }
    }

    calculatePrice = () => {
       tempPrice = 0;
        for ( var i = 0; i < this.state.seats.length; i++) {
            if( this.state.seats[i] === true) {
                tempPrice++;
            }
        }
        return (totalPrice = (tempPrice - initPrice) * this.state.price);
    }

    render(){
        if (this.state.movie === undefined) {
            return(
                <Grid fluid>
                    <Row>
                        <Col xs={2}>
                        </Col>
                        <Col xs={8}>
                            <PageHeader>
                            <strong>Cinema95</strong>
                            </PageHeader>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={2}>
                        </Col>
                        <Col xs={8}>
                            {this.renderMovieList()}
                        </Col>
                    </Row>
                </Grid>
            )
        }
        if (this.state.pick === undefined) {
            return(
                <Grid fluid>
                    <Row>
                        <Col xs={2}>
                        </Col>
                        <Col xs={8}>
                            <PageHeader>
                            Booking
                            </PageHeader>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={2}>
                        </Col>
                        <Col xs={8}>
                            {this.renderMovieDetail(this.state.movie[0].movie)}
                        </Col>
                    </Row>
                </Grid>
            )
        }
        else if (this.state.pick !== undefined) {
            console.log("re render")
            return(
                <Grid fluid>
                    <Row>
                        <Col xs={2}>
                        </Col>
                        <Col xs={8}>
                            <PageHeader>
                            Booking
                            </PageHeader>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={2}>
                        </Col>
                        <Col xs={8}>
                            {this.renderMovieDetail(this.state.movie[0].movie)}
                        </Col>
                    </Row>
                    <Row>
                    <br/><br/><br/><br/><br/>
                    <Col xs={4}>
                    </Col>
                    <Col xs={4}>
                    <div className="square"></div>
                    </Col>  
                    </Row>
                    <Row>
                        <br/><br/><br/>
                        <Col xs={4}>
                        </Col>
                        <Col xs={4}>
                            {this.renderSeatList()}
                        </Col>
                    </Row>
                    <Row>
                        <br/>
                        <Col xs={4}>
                        </Col>
                        <Col xs={4}>
                            <h3 className="margin-left-200">Total Price: {this.calculatePrice()}</h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={4}>
                        </Col>
                        <Col xs={4}>
                            <input className="btn btn-success margin-left-200" text-align="right" type="button" value="CHECKOUT" onClick={()=>this.onConfirmClick()}/>
                        </Col>
                    </Row>
        
                </Grid>
                )
        }
    }
}

const mapStateToProps = (state) => {
    const auth = state.auth;
    return {auth};
}
export default connect(mapStateToProps, {})(HomePage);