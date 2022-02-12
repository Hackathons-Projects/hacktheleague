const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true },
    fullName: { type: String },
    email: { type: String },
    phone: { type: String },
    bloodType: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    lastDonationDate: { type: Date, default: null },
    location: {
      latitude: { type: String },
      longitude: { type: String },
    },
    address: {
      street: { type: String },
      locality: { type: String },
      city: { type: String },
      country: { type: String },
      pincode: { type: String },
    } 
  },
  {timestamps: true}
);

module.exports = mongoose.model("User", userSchema);
