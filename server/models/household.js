const mongoose = require("mongoose");

const householdSchema = new mongoose.Schema({
  roundStatus: {
    type: Boolean,
  },
  incharge: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  manufacturer: {
    type: String,
    required: true,
  },
  meterNo: {
    type: String,
    required: true,
  },
  capacity: {
    type: String,
    required: true,
  },
  MHRNo: {
    type: String,
    required: true,
  },
  bookNo: {
    type: String,
    required: true,
  },
  BPNo: {
    type: String,
    required: true,
  },
  serviceNo: {
    type: String,
    required: true,
  },
  readings: [
    {
      energy: Number,
      PF: String,
      MD: String,
      date: String,
    },
  ],
});

const Household = mongoose.model("Household", householdSchema);

module.exports = Household;
