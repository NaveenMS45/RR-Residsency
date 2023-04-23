const User = require("../models/User");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const newUser = new User({ name, email, password });

  try {
    newUser.save();
    res.send("User Registered successfully");
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password });

    if (user) {
      // const currentUser = {
      //   name: user[0].name,
      //   email: user[0].email,
      //   isAdmin: user[0].isAdmin,
      //   _id: user[0]._id,
      // };
      res.send({
        name : user.name,
        email : user.email,
        isAdmin : user.isAdmin,
        _id : user._id,
      });
     }
     else {
      return res.status(400).json({ message: "User Login Failed" });
    }
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

const deleteUser = async(req, res) => {
  const userId = req.body.userId

    try {
        await User.findOneAndDelete({_id : userId})
        res.send('User Deleted Successfully')
    } catch (error) {
        return res.status(400).json({ message: error });
    }
};

module.exports = { register, login, getAllUsers, deleteUser };
