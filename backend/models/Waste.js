import mongoose from "mongoose";

const wasteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  description: String,
  image: { type: String, default: null },

  category: {
    type: String,
    enum: ["electronic", "paper", "cloth", "medical"],
    required: true
  },

  address: {
    houseOrFlat: { type: String },
    street: { type: String },
    area: { type: String },
    city: { type: String },
    state: { type: String },
    pincode: { type: String },
    lat: { type: Number, default: null },
    lng: { type: Number, default: null }
  },

  pickupDate: { type: Date, required: true },
  pickupTimeSlot: { type: String, required: true },

  status: {
    type: String,
    enum: [
      "pending",
      "assigned",
      "out_for_pickUp",
      "at_doorstep",
      "collected",
      "completed"
    ],
    default: "pending"
  },

  assignedDriver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
  }

}, { timestamps: true });

export default mongoose.model("Waste", wasteSchema);
