const Bookings = require('../models/Booking');
const Rooms = require('../models/Rooms');
const moment = require('moment');

const bookRoom = async (req, res) => {

    const { room, userId, fromDate, toDate, totalDays, totalAmount } = req.body;

    try {
        const newBooking = new Bookings({
            room : room.name,
            roomId : room._id,
            userId,
            fromDate : moment(fromDate).format('DD-MM-YYYY'),
            toDate : moment(toDate).format('DD-MM-YYYY'),
            totalDays,
            totalAmount,
            transactionId : '1234'
        });
        const booking = await newBooking.save();

        const tempRoom = await Rooms.findOne({_id : room._id})

        tempRoom.currentBookings.push({
            bookingId : booking._id,
            fromDate : moment(fromDate).format('DD-MM-YYYY'),
            toDate : moment(toDate).format('DD-MM-YYYY'),
            userId : userId,
            status : booking.status,
        })

        await tempRoom.save()
        res.send(`Room Booked successfully`)
    }catch(err) {
        res.status(400).json({message : err})
    }   
};

const getAllBookings = async (req, res) => {
    try {
      const bookings = await Bookings.find({});
      res.send(bookings);
    } catch (error) {
      return res.status(400).json({ message: error });
    }
} 

const getUserBookings = async (req, res) => {
    const { userId } = req.body;
  try {
    const bookings = await Booking.find({ userId: userId }).sort({ _id: -1 });
    res.send(bookings);
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong" });
  }
}

module.exports = {bookRoom, getAllBookings, getUserBookings};