const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please add username"],
  },
  age: {
    type: Number,
    required: [true, "Please add an age"],
  },
  hobbies: {
    type: Array,
    required: [true, "Please add a hobbies"],
    default: [],
  },
});



module.exports = mongoose.model("User", UserSchema);
