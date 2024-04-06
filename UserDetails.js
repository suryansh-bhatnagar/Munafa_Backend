const mongoose = require("mongoose");

const UserDetailSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    mobile: {
      type: String,
      required: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      trim: true
    },
    image: {
      type: String,
      trim: true
    },
    gender: {
      type: String,
      trim: true
    },
    professionName: {
      type: String,
      trim: true
    },

  },
);

module.exports = mongoose.model('User', UserDetailSchema);

