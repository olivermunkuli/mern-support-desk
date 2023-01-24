const mongoose = require('mongoose');

const ticketSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'The user field is required'],
    },
    product: {
      type: String,
      enum: ['iPhone', 'Macbook Pro', 'iMac', 'iPad'],
      required: [true, 'The product field is required'],
    },
    description: {
      type: String,
      required: [true, 'Please enter a descrption of the issue'],
    },
    status: {
      type: String,
      require: true,
      enum: ['new', 'open', 'closed'],
      default: 'new',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Ticket', ticketSchema);
