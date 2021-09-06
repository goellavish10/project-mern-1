const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    items: {
      type: Array,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
