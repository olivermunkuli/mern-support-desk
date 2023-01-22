const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'The name field is required'],
    },
    email: {
      type: String,
      required: [true, 'The email field is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'The password field is required'],
    },
    isAdmin: {
      type: Boolean,
      required: [true, 'The isAdmin field is required'],
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);
