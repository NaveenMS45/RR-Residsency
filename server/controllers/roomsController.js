const Rooms = require('../models/Rooms')


const addRoom = async(req, res) => {
    const { room , 
       rentPerDay, maxCount ,description ,phoneNumber ,type ,image1 ,image2 ,image3} = req.body
  
       const newRoom = new Rooms({
            name : room,
            rentPerDay, 
            maxCount , description , phoneNumber , type , imageUrls:[image1 , image2 ,image3] , currentBookings:[]
       })
       try {
            await newRoom.save()
            res.send('New Room Added Successfully')
       } catch (error) {
            return res.status(400).json({ error });
       }
  }

const getAllRooms = async (req, res) => {
   
    try {
         const rooms = await Rooms.find({})
         res.status(200).json(rooms)
    } catch (error) {
         return res.status(400).json({ message: 'something went wrong' });
    }

}

const getRoomById = async (req,res) => {
     try{
          const {id : roomId} = req.params;
          const room = await Rooms.findOne({'_id' : roomId});
          console.log(room)
          res.send(room);
     }catch(e){
          return res.status(400).json({ message: error });
     }
}

module.exports = {
    addRoom,
    getAllRooms,
    getRoomById,
}