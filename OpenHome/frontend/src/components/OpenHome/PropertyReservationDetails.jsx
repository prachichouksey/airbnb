import React, { Component } from "react";
// import { Link } from "react-router-dom";
import { API_URL } from "../../Constants";
import axios from "axios";
class PropertyReservationDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      booking: [],
      msg: "",
      flag: false
    };
  }

  componentDidMount() {
    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener('popstate', function (event) {
      window.history.pushState(null, document.title, window.location.href);
    });


    let id = this.props.match.params.propertyId;
    axios
      .get(API_URL + `/reservation/property/${id}`, {
        headers: { "Content-Type": "application/json" }
      })
      .then(response => {
        console.log(response.data);
        this.setState({
          booking: this.state.booking.concat(response.data)
        });
      });
  }

  cancelBooking = (booking) => {

    var data = {
      "reservationId": booking.id

    };

    axios.post(API_URL + `/reservation/host/cancel`, data)
      .then(response => {
        let id = this.props.match.params.propertyId;
        axios
          .get(API_URL + `/reservation/property/${id}`, {
            headers: { "Content-Type": "application/json" }
          })
          .then(response => {

            this.setState({
              booking: response.data
            });
          });
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          this.setState({
            msg: "Cancel Successful",
            flag: true
          })
          console.log(response);
          if (!response.data) {
            // alert("No Available Properties")
          }
        }
        else {
          this.setState({
            msg: "Unable to Cancel",
            flag: true
          })
        }
      })
      .catch(err => {
        let id = sessionStorage.userId;
        axios
          .get(API_URL + `/reservation/property/${id}`, {
            headers: { "Content-Type": "application/json" }
          })
          .then(response => {
            console.log(response.data);
            this.setState({
              booking: response.data
            });
          });

        this.setState({
          msg: "Unable to Cancel",
          flag: true
        })
      })
  }

  
  render() {
    return (
      <div style={{ backgroundColor: "white", opacity: 1, filter: "Alpha(opacity=100)", borderRadius: '10px' }}>

        <br />
    <h2>Openhome Host Dashboard for reservations of Property {this.props.match.params.propertyId}</h2>
        <br />
        <h4>Welcome {this.props.match.params.name}</h4>


 
  <ul class="nav nav-tabs" role="tablist">
    <li class="nav-item">
      <a class="nav-link active" data-toggle="tab" href="#home">Up Coming Bookings</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" data-toggle="tab" href="#menu1">On Going Bookings</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" data-toggle="tab" href="#menu3">Completed</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" data-toggle="tab" href="#menu2">Cancelled Or Missed Bookings</a>
    </li>
  </ul>

  
  <div class="tab-content">
    <div id="home" class="tab-pane active"><br/>
      <h3>Up Coming Bookings</h3>
      <table className="table">
          <tr>
            <th>Booking ID</th>
            <th>Address</th>
            <th>Description</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Check-IN</th>
            <th>Check-Out</th>
            <th>Penalty Reason</th>
            <th>Penalty Amount</th>
            <th>Booking Amount</th>
            <th>Total Payable</th>
            <th>Status</th>

            <th></th>
            <th></th>
            <th></th>

          </tr>
          {this.state.booking.map(booking => { 
            if(booking.state === "Booked"){
            return (
              <tr>
                <td>{booking.id}</td>
                <td>{booking.address}</td>
                <td>{booking.description}</td>
                <td>{booking.startDate}</td>
                <td>{booking.endDate}</td>
                <td>{booking.checkInDate}</td>
                <td>{booking.checkOutDate}</td>
                <td>{booking.penaltyReason}</td>
                <td>{booking.penaltyValue}</td>
                <td>{booking.bookedPrice}</td>
                <td>{booking.paymentAmount}</td>

                <td>{booking.state}</td>
                
                <td> <button onClick={() => this.cancelBooking(booking)} class="btn btn-primary">Cancel</button></td>
              </tr>
            )
          }
          else{
            return(
              <>
              </>
            )
          }
          })}
        </table>
      </div>
    <div id="menu1" class=" tab-pane fade"><br/>
      
      <h3>On Going Bookings</h3>
      <table className="table">
          <tr>
            <th>Booking ID</th>
            <th>Address</th>
            <th>Description</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Check-IN</th>
            <th>Check-Out</th>
            <th>Penalty Reason</th>
            <th>Penalty Amount</th>
            <th>Booking Amount</th>
            <th>Total Payable</th>
            <th>Status</th>

            <th></th>
            <th></th>
            <th></th>

          </tr>
          {this.state.booking.map(booking => { 
            if(booking.state === "CheckedIn"){
            return (
              <tr>
                <td>{booking.id}</td>
                <td>{booking.address}</td>
                <td>{booking.description}</td>
                <td>{booking.startDate}</td>
                <td>{booking.endDate}</td>
                <td>{booking.checkInDate}</td>
                <td>{booking.checkOutDate}</td>
                <td>{booking.penaltyReason}</td>
                <td>{booking.penaltyValue}</td>
                <td>{booking.bookedPrice}</td>
                <td>{booking.paymentAmount}</td>

                <td>{booking.state}</td>
                
                <td> <button onClick={() => this.cancelBooking(booking)} class="btn btn-primary">Cancel</button></td>
              </tr>
            )
          }
          else{
            return(
              <>
              </>
            )
          }
          })}
        </table>
    </div>
    <div id="menu2" class=" tab-pane fade"><br/>
      
      <h3>Cancelled Or Missed Bookings</h3>
      <table className="table">
          <tr>
            <th>Booking ID</th>
            <th>Address</th>
            <th>Description</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Check-IN</th>
            <th>Check-Out</th>
            <th>Penalty Reason</th>
            <th>Penalty Amount</th>
            <th>Booking Amount</th>
            <th>Total Payable</th>
            <th>Status</th>

            <th></th>
            <th></th>
            <th></th>

          </tr>
          {this.state.booking.map(booking => { 
            if(booking.state !== "Booked" && booking.state !== "CheckedIn" && booking.state !== "CheckedOut"){
            return (
              <tr>
                <td>{booking.id}</td>
                <td>{booking.address}</td>
                <td>{booking.description}</td>
                <td>{booking.startDate}</td>
                <td>{booking.endDate}</td>
                <td>{booking.checkInDate}</td>
                <td>{booking.checkOutDate}</td>
                <td>{booking.penaltyReason}</td>
                <td>{booking.penaltyValue}</td>
                <td>{booking.bookedPrice}</td>
                <td>{booking.paymentAmount}</td>

                <td>{booking.state}</td>
                
                <td> <button onClick={() => this.cancelBooking(booking)} class="btn btn-primary">Cancel</button></td>
              </tr>
            )
          }
          else{
            return(
              <>
              </>
            )
          }
          })}
        </table>
    </div>

    <div id="menu3" class=" tab-pane fade"><br/>
      
      <h3>Completed Bookings</h3>
      <table className="table">
          <tr>
            <th>Booking ID</th>
            <th>Address</th>
            <th>Description</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Check-IN</th>
            <th>Check-Out</th>
            <th>Penalty Reason</th>
            <th>Penalty Amount</th>
            <th>Booking Amount</th>
            <th>Total Payable</th>
            <th>Status</th>

            <th></th>
            <th></th>
            <th></th>

          </tr>
          {this.state.booking.map(booking => { 
            if(booking.state === "CheckedOut"){
            return (
              <tr>
                <td>{booking.id}</td>
                <td>{booking.address}</td>
                <td>{booking.description}</td>
                <td>{booking.startDate}</td>
                <td>{booking.endDate}</td>
                <td>{booking.checkInDate}</td>
                <td>{booking.checkOutDate}</td>
                <td>{booking.penaltyReason}</td>
                <td>{booking.penaltyValue}</td>
                <td>{booking.bookedPrice}</td>
                <td>{booking.paymentAmount}</td>

                <td>{booking.state}</td>
               
                <td> <button onClick={() => this.cancelBooking(booking)} class="btn btn-primary">Cancel</button></td>
              </tr>
            )
          }
          else{
            return(
              <>
              </>
            )
          }
          })}
        </table>
    </div>
    

  </div>


        
       

        <h4 style={{ backgroundColor: "powderblue" }}>{this.state.flag && <>{this.state.msg}</>}</h4>
      </div>


    );
  }
}

export default PropertyReservationDetails;