import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Error from "../components/Error";
import Loader from "../components/Loader";
import moment from "moment"
import sweet from "sweetalert2"
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init({
  duration : '2000'
});


function BookingScreen() {
  const { roomId, fromDate, toDate } = useParams();
  const [loading, setLoading] = useState();
  const [error, setError] = useState(false);
  // const [success, setSuccess]=useState(false)
  const [room, setRoom] = useState();
  const from = moment(fromDate,"DD-MM-YYYY");
  const to = moment(toDate,"DD-MM-YYYY");
  const totalDays = moment.duration(to.diff(from)).asDays()+1
  const [totalAmount , setTotalAmount]=useState()
  const url = `/api/v1/rooms/getRoomById/${roomId}`;

  const fetchInfo = () => {
    try {
      setLoading(true);
      axios.post(url).then((res) => {
        setTotalAmount(res.data.rentPerDay * totalDays)
        setRoom(res.data);
      });
      setLoading(false);
    } catch (e) {
      setError(true);
      console.log(e);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  async function bookRoom() {
    const bookingDetails = {
        room,
        userId : JSON.parse(localStorage.getItem('currentUser'))._id,
        fromDate,
        toDate,
        totalAmount,
        totalDays
    }
    try{
      setLoading(true)
      const result = await axios.post('/api/v1/bookings/bookRoom', bookingDetails)
      console.log(result)
      setLoading(false)
      sweet.fire('congratulations', 'Your Room Booked Successfully', 'success').then((res)=>{
        window.location.href = "/profile"
      })
    }catch(e){
      setLoading(false)
      sweet.fire('Oops', 'something went wrong', 'error')
      console.log(e)
    }
  }

  return (
    <div className="m-5" data-aos="flip-left">
      {/* <h1>Room Id : {roomId}</h1>
      <h1>Room Name : {room.name}</h1> 
      <p>Description : {room.description}</p>
      <img src={room.imageUrls[0]} alt="img" />   */}
      {loading ? (
        <Loader/>
      ) : room ? 
        (
        <div>
          <div className="row bs justify-content-center mt-5">
            <div className="col-md-5">
              <h1>{room.name}</h1>
              <img src={room.imageUrls[0]} className="bigImg" alt="img" />
            </div>
            <div className="col-md-5">
              <div style={{ textAlign: "right" }}>
                <h1>Booking Details</h1>
                <hr />

                <b>
                  <p>Name : {JSON.parse(localStorage.getItem("currentUser")).name}</p>
                  <p>From Date : {fromDate}</p>
                  <p>To Date : {toDate}</p>
                  <p>Max Count : {room.maxCount}</p>
                </b>
              </div>
              <div style={{ textAlign: "right" }}>
                <b>
                  <h1> Amount </h1>
                  <hr />
                  <p> Total Days : {totalDays}</p>
                  <p> RentPerDay : {room.rentPerDay} </p>
                  <p> TotalAmount : {totalAmount}</p>
                </b>
              </div>

              <div style={{ float: "right" }}>
                <button className="btn" onClick={bookRoom}>Pay Now</button>
              </div>
            </div>
          </div>
        </div>
      ) : (<Error/>)}
    </div>
  );
}

export default BookingScreen;
