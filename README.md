# RR-Resisency

#### Server

--> Move to the server folder using the following command - cd server.
--> Update the script in the package.json file : script {start : nodemon app.js}.

### Environment variable

--> Create a .env file.
--> Add the following command and save the file.
    --> mongoUrl = mongodb+srv://MS:45@node-express-projects.khla8fo.mongodb.net/RRR?retryWrites=true&w=majority
--> start the server - "npm start".
--> The server will start listening to the loaclhost:5000 .

### Client

--> Go to the client folder and use the start command - "npm start"
--> It will redirect to the localhost:3000 .

### Protected Routes

  # Profile Route
  
  --> The profile route is will be accessed, only the user is logged in .
  --> The user details will be avaliable there.
  
  # Admin Route
  
  --> The admin route is also protected .
  --> The user with admin credentials can access the admin route .
  --> The admin can see all the user bookings, can add new rooms to the database, can see all the users of the application.
  
  ### Database Schema
  
   # Room Schema
   
   const roomSchema = mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    currentBookings:[],

    imageUrls:[],
    maxCount:{
        type:Number ,
         required:true
    },
    phoneNumber:
    {
        type:Number, 
        required:true
    },
    rentPerDay:
    {
        type:Number,
         required:true
    },
    type:
    {
        type:String,
        required:true
    },
    

}, { timestamps: true })


  # User Schema
  
  const UserSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    },
    isAdmin : {
        type : Boolean,
        default : false,
    }, 
    
}, {timestamps: true});


  # Booking Schema
  
  const BookingSchema = mongoose.Schema({
    room:{type:String, required:true},
    roomId:{type:String, required:true},
    userId:{type:String , required:true},
    fromDate:{type:String, required:true},
    toDate:{type:String, required:true},
    totalDays:{type:Number , required:true},
    totalAmount:{type:Number, required:true},
    transactionId:{type:String, required:true},
    status:{type:String, required:true , default:'booked'},
},{
    timestamps:true,
}) 





