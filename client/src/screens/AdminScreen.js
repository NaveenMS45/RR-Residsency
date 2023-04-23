import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import axios from "axios";
import Error from "../components/Error";
import Loader from "../components/Loader";

const items = [
  {
    key: "1",
    label: `BOOKINGS`,
    children: <Bookings />,
  },
  {
    key: "2",
    label: `ROOMS`,
    children: <Rooms />,
  },
  {
    key: "3",
    label: `ADD ROOM`,
    children: <AddRoom />,
  },
  {
    key: "4",
    label: `USERS`,
    children: <Users/>,
  },
];

function AdminScreen() {
  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("currentUser")).isAdmin) {
      window.location.href = "/home";
    }
  }, []);

  return (
    <div className="mt-3 ml-3 mr-3 bs">
      <h2 className="text-center" style={{ fontSize: "30px" }}>
        <b> Admin Panel </b>
      </h2>
      <Tabs defaultActiveKey="1" items={items} />;
    </div>
  );
}

export default AdminScreen;

// Bookings
export function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const url = '/api/v1/bookings/getAllBookings'
  const fetchInfo = () => {
    try {
      setLoading(true);
      axios.get(url).then((res) => {
        setBookings(res.data)
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



  return (
    <div className="col-md-11">
      <h1>Bookings</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Error />
      ) : (
        <div>
          <table className="table table-bordered table-dark">
            <thead className="bs">
              <tr>
                <th>Booking Id</th>
                <th>UserId</th>
                <th>Room</th>
                {/* <th>From</th>
                <th>To</th> */}
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => {
                return (
                  <tr>
                    <td>{booking._id}</td>
                    <td>{booking.userId}</td>
                    <td>{booking.room}</td>
                    {/* <td>{booking.fromDate}</td>
                    <td>{booking.toDate}</td> */}
                    <td>{booking.status}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}


// // Rooms

export function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const url = "/api/v1/rooms/getAllRooms";
  const fetchInfo = () => {
    try {
      setLoading(true);
      axios.get(url).then((res) => {
        setRooms(res.data);
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
  return (
    <div className="col-md-11">
      <h1>Rooms</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Error />
      ) : (
        <div>
          <table className="table table-bordered table-dark">
            <thead className="bs">
              <tr>
                <th>Room Id</th>
                <th>Name</th>
                <th>Type</th>
                <th>Rent Per day</th>
                <th>Max Count</th>
                <th>Phone Number</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room) => {
                return (
                  <tr>
                    <td>{room._id}</td>
                    <td>{room.name}</td>
                    <td>{room.type}</td>
                    <td>{room.rentPerDay}</td>
                    <td>{room.maxCount}</td>
                    <td>{room.phoneNumber}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// USERS

export function Users() {
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const userData = axios.get("/api/v1/auth/getAllUsers").data;
      setUsers(userData);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, []);

  return (
    <div className="row">
      {loading && <Loader />}

      <div className="col-md-10">
        <table className="table table-bordered table-dark">
          <thead className="bs">
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>isAdmin</th>
            </tr>
          </thead>

          <tbody>
            {users &&
              users.map((user) => {
                return (
                  <tr>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.isAdmin ? "YES" : "NO"}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Add Room

export function AddRoom() {
  const [room, setRoom] = useState("");
  const [rentPerDay, setRentPerDay] = useState();
  const [maxCount, setMaxCount] = useState();
  const [description, setDescription] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [type, setType] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  async function addRoom() {
    const roomObj = {
      room,
      rentPerDay,
      maxCount,
      description,
      phoneNumber,
      type,
      image1,
      image2,
      image3,
    };
    try {
      const result = await axios.post("/api/v1/rooms/addRoom", roomObj);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="row">
      <div className="col-md-5">
        <input
          type="text"
          className="form-control mt-1"
          placeholder="name"
          value={room}
          onChange={(e) => {
            setRoom(e.target.value);
          }}
        />

        <input
          type="text"
          className="form-control mt-1"
          placeholder="rentPerDay"
          value={rentPerDay}
          onChange={(e) => {
            setRentPerDay(e.target.value);
          }}
        />

        <input
          type="text"
          className="form-control mt-1"
          placeholder="maxCount"
          value={maxCount}
          onChange={(e) => {
            setMaxCount(e.target.value);
          }}
        />

        <input
          type="text"
          className="form-control mt-1"
          placeholder="description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />

        <input
          type="text"
          className="form-control mt-1"
          placeholder="phoneNumber"
          value={phoneNumber}
          onChange={(e) => {
            setPhoneNumber(e.target.value);
          }}
        />
      </div>

      <div className="col-md-6">
        <input
          type="text"
          className="form-control mt-1"
          placeholder="type"
          value={type}
          onChange={(e) => {
            setType(e.target.value);
          }}
        />
        <input
          type="text"
          className="form-control mt-1"
          placeholder="Image url 1"
          value={image1}
          onChange={(e) => {
            setImage1(e.target.value);
          }}
        />
        <input
          type="text"
          className="form-control mt-1"
          placeholder="Image url 2"
          value={image2}
          onChange={(e) => {
            setImage2(e.target.value);
          }}
        />
        <input
          type="text"
          className="form-control mt-1"
          placeholder="Image url 3"
          value={image3}
          onChange={(e) => {
            setImage3(e.target.value);
          }}
        />
        <div className="mt-1 text-right">
          <button className="btn btn-primary" onClick={addRoom}>
            ADD ROOM
          </button>
        </div>
      </div>
    </div>
  );
}
