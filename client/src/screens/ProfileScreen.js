import React, {useEffect} from 'react'
// import axios from 'axios'
import { Tabs } from 'antd';
// import Loader from "../components/Loader";
// import Error from "../components/Error";

const items = [
  {
    key: '1',
    label: `MY PROFILE`,
    children: <MyProfile/>,
  },
  // {
  //   key: '2',
  //   label: `MY BOOKINGS`,
  //   children: <MyBookings/>,
  // },
];

const user = JSON.parse(localStorage.getItem('currentUser'));

function ProfileScreen() {

  
  useEffect(()=>{
    if(!user){
      window.location.href = "/login";
    }
  })
  return (
    <div className='ml-3 mt-3'>
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  )
}

export default ProfileScreen

// MY PROFILE

export function MyProfile() {
  return (
    <div>
      <h1>Name : {user.name}</h1>
      <h1>Email : {user.email}</h1>
      <h1>isAdmin : {user.isAdmin ? "YES" : "NO"}</h1>
    </div>
  )
}

// MY BOOKINGS

// export function MyBookings(){

//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(false);

//   const url = "https://imms-rrr.onrender.com/api/v1/bookings/getUserBookings";
//   const fetchInfo = () => {
//     try {
//       setLoading(true);
//       axios.post(url,{userId : user._id}).then((res) => {
//         setBookings(res.data);
//       });
//       setLoading(false);
//     } catch (e) {
//       setError(true);
//       console.log(e);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchInfo();
//   }, []);

//   return (
//     <div className='row'>
//       <div className='col-md-6'>

//         {loading && (<Loader/>)}
//         {bookings && (bookings.map(booking => {
//           return (
//             <div className='bs'>
//               <h1>{booking.room}</h1>
//               <p>BookingId : {booking._id}</p>
//               <p>Amount : {booking.totalAmount}</p>
//               <p>Status : {booking.status === `booked` ? `Confirmed` : `Canceled`}</p>
//               <div className='text-right'>
//                 <button className='btn'> CANCEL BOOKING </button>
//               </div>
//             </div>
//           )
//         }))}

//       </div>
//     </div>
//   )
// }