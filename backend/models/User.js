//use phone no 
// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },

  email: { type: String, required: true, unique: true },

  password: { type: String, required: true },

  role: {
    type: String,
    enum: ["admin", "user", "driver"],
    default: "user"
  },

 phone: {
  type: String,
  validate: {
    validator: function (v) {
      if (this.role === "driver" || this.role === "user") {
        return typeof v === "string" && v.trim().length > 0;
      }
      return true;
    },
    message: "Phone number is required for drivers."
  }
  },
   address: {
    line1: String,
    city: String,
    state: String,
    pincode: String
  },
   licenseNumber: {
  type: String,
  required: function() { return this.role === "driver"; }
  },
    aadhaarNumber: {
      type: String,
      required: function () {
        return this.role === "driver";
      },
        validate: {
        validator: function (v) {
          return /^\d{12}$/.test(v); // Aadhaar = 12 digits
        },
        message: "Aadhaar number must be exactly 12 digits",
      },
    },

adminCode: {
  type: String,
  required: function() { return this.role === "admin"; }
}


}, { timestamps: true });

export default mongoose.model("User", userSchema);



// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   role: { type: String, enum: ["admin","user","driver"], default: "user" }
// }, { timestamps: true });

// export default mongoose.model("User", userSchema);
