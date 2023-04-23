import { useState, useEffect } from "react";
import axios from "axios";
import Room from "../components/Room";
import { DatePicker } from "antd";
import moment from "moment";
import Loader from "../components/Loader";
import Error from "../components/Error";



const { RangePicker } = DatePicker;

function HomeScreen() {
  const url = "/api/v1/rooms/getAllRooms";
  const [rooms, setRooms] = useState([]);
  const [roomCopy, setRoomCopy] = useState([]);
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [searchKey, setSearchKey] = useState();
  const [type, setType] = useState("all");

  const fetchInfo = () => {
    try {
      setLoading(true);
      axios.get(url).then((res) => {
        setRooms(res.data);
        setRoomCopy(res.data);
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

  function filterByDate(dates) {
    // console.log(date)
    // console.log(moment(date[0]).format('DD-MM-YYYY'));
    // console.log(moment(date[1]).format('DD-MM-YYYY'));
    setFromDate(moment(dates[0]).format("DD-MM-YYYY"));
    setToDate(moment(dates[1]).format("DD-MM-YYYY"));

    var temp = [];
    for (var room of roomCopy) {
      var availability = false;

      for (var booking of room.currentBookings) {
        if (room.currentBookings.length) {
          if (
            !moment(moment(dates[0]).format("DD-MM-YYYY")).isBetween(
              booking.fromDate,
              booking.toDate
            ) &&
            !moment(moment(dates[1]).format("DD-MM-YYYY")).isBetween(
              booking.fromDate,
              booking.toDate
            )
          ) {
            if (
              moment(dates[0]).format("DD-MM-YYYY") !== booking.fromDate &&
              moment(dates[0]).format("DD-MM-YYYY") !== booking.toDate &&
              moment(dates[1]).format("DD-MM-YYYY") !== booking.fromDate &&
              moment(dates[1]).format("DD-MM-YYYY") !== booking.toDate
            ) {
              availability = true;
            }
          }
        }
      }
      if (availability || room.currentBookings.length === 0) {
        temp.push(room);
      }
      setRooms(temp);
    }
  }
  function filterBySearch() {
    const copy = roomCopy.filter((room) =>
      room.name.toLowerCase().includes(searchKey.toLowerCase())
    );
    setRooms(copy);
  }
  function filterByType(e) {
    setType(e);
    if (e !== "all") {
      const copy = roomCopy.filter(
        (room) => room.type.toLowerCase() === e.toLowerCase()
      );
      setRooms(copy);
    } else {
      setRooms(roomCopy);
    }
  }

  return (
    <div className="container">
      <div className="row mt-5 bs">
        {/* Date Filter */}
        <div className="col-md-3">
          <RangePicker format="DD-MM-YYYY" onClick={filterByDate} />
        </div>
        {/* Room Filter */}
        <div className="col-md-5">
          <input
            type="text"
            placeholder="Search Rooms"
            className="form-control"
            value={searchKey}
            onChange={(e) => {
              setSearchKey(e.target.value);
            }}
            onKeyUp={filterBySearch}
          />
        </div>
        {/* Type Filter */}
        <div className="col-md-3">
          <select
            className="form-control"
            value={type}
            onChange={(e) => {
              filterByType(e.target.value);
            }}
          >
            <option value="all"> All </option>
            <option value="delux"> Delux </option>
            <option value="non-delux"> Non-Delux </option>
          </select>
        </div>
      </div>
      <div className="row justify-content-center mt-5">
        {loading ? (
          <Loader />
        ) : rooms.length > 1 ? (
          rooms.map((room) => {
            return (
              <div className="col-md-9 mt-2">
                <Room room={room} fromDate={fromDate} toDate={toDate} />
                {/* <img src={room.imageUrls[0]} alt="roomImage"/> */}
              </div>
            );
          })
        ) : (
          <Error />
        )}
      </div>
    </div>
  );
}

export default HomeScreen;
