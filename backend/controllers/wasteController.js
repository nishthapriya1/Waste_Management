import Waste from '../models/Waste.js';
import multer from 'multer';
import User from "../models/User.js";

/* ================= MULTER ================= */
const storage = multer.memoryStorage();
export const upload = multer({ storage });
/* ================= CREATE WASTE ================= */
export const createWaste = async (req, res) => {
  try {
    const { description, category, pickupDate, pickupTimeSlot } = req.body;


    if (!description) {
      return res.status(400).json({ message: 'Description is required' });
    }
    if (!category) {
      return res.status(400).json({ message: "Category is required" });
    } 
    if (!pickupDate) {
  return res.status(400).json({ message: "Pickup date is required" });
}
if (!pickupTimeSlot) {
  return res.status(400).json({ message: "Pickup time slot is required" });
}

    /* HANDLE BOTH JSON & FORM-DATA */
    const address = {
      houseOrFlat:
        req.body.houseOrFlat ||
        req.body?.address?.houseOrFlat ||
        req.body['address[houseOrFlat]'] ||
        '',

      street:
        req.body.street ||
        req.body?.address?.street ||
        req.body['address[street]'] ||
        '',

      area:
        req.body.area ||
        req.body?.address?.area ||
        req.body['address[area]'] ||
        '',

      city:
        req.body.city ||
        req.body?.address?.city ||
        req.body['address[city]'] ||
        '',

      state:
        req.body.state ||
        req.body?.address?.state ||
        req.body['address[state]'] ||
        '',

      pincode:
        req.body.pincode ||
        req.body?.address?.pincode ||
        req.body['address[pincode]'] ||
        '',

      lat:
        req.body.lat ||
        req.body?.address?.lat ||
        req.body['address[lat]'] ||
        null,

      lng:
        req.body.lng ||
        req.body?.address?.lng ||
        req.body['address[lng]'] ||
        null,
    };

    // VALIDATE ADDRESS FIELDS
    const addressErrors = {};

    if (!address.houseOrFlat) addressErrors.houseOrFlat = "House / Flat is required";
    if (!address.street) addressErrors.street = "Street is required";
    if (!address.area) addressErrors.area = "Area is required";
    if (!address.city) addressErrors.city = "City is required";
    if (!address.state) addressErrors.state = "State is required";
    if (!address.pincode) addressErrors.pincode = "Pincode is required";

    if (Object.keys(addressErrors).length > 0) {
      return res.status(400).json({ success: false, errors: addressErrors });
    }

    /* CREATE WASTE */
    const newWaste = await Waste.create({
      user: req.user._id,
      description,
      category,
      address,
      pickupDate,
      pickupTimeSlot,
      image: req.file ? req.file.originalname : null
    });

    res.status(201).json({
      success: true,
      data: newWaste
    });

  } catch (err) {
    console.error('Error creating waste:', err);
    res.status(500).json({
      success: false,
      message: 'Server error while creating waste',
      error: err.message
    });
  }
};



/* ================= GET ALL WASTES ================= */
// export const getAllWastes = async (req, res) => {
//   let wastes;

//   if (req.user.role === 'driver') {
//     wastes = await Waste.find({ driver: req.user._id })
//       .populate('user','name');
//   } else {
//     wastes = await Waste.find()
//       .populate('user','name')
//       .populate('driver','name phone');
//   }

//   res.json(wastes);
// };
export const getAllWastes = async (req, res) => {
  try {
    let wastes;

    // 👤 USER → only their wastes
    if (req.user.role === "user") {
      wastes = await Waste.find({ user: req.user._id })
        .sort({ createdAt: -1 })
        .populate("assignedDriver", "name phone email");
    }

    // 🚚 DRIVER → only wastes assigned to the driver
    else if (req.user.role === "driver") {
      wastes = await Waste.find({ assignedDriver: req.user._id })
        .sort({ createdAt: -1 })
        .populate("assignedDriver", "name phone email")
        .populate("user", "name phone");
    }

    // 🛠 ADMIN → all wastes
    else if (req.user.role === "admin") {
      wastes = await Waste.find()
        .sort({ createdAt: -1 })
        .populate("user", "name phone")
        .populate("assignedDriver", "name phone email");
    }

    res.json(wastes);
  } catch (err) {
    console.error("Error fetching wastes:", err);
    res.status(500).json({ message: "Error fetching wastes" });
  }
};

   




/* ================= ASSIGN DRIVER ================= */

export const assignDriver = async (req, res) => {
  try {
    const { wasteId, driverId } = req.body;

    if (!wasteId || !driverId) {
      return res
        .status(400)
        .json({ message: "wasteId and driverId are required" });
    }

    const waste = await Waste.findById(wasteId);
    if (!waste) {
      return res.status(404).json({ message: "Waste not found" });
    }

    const driver = await User.findById(driverId);
    if (!driver || driver.role !== "driver") {
      return res
        .status(400)
        .json({ message: "Selected user is not a valid driver" });
    }

    // Update only those fields — no full validation
    const updated = await Waste.findByIdAndUpdate(
      wasteId,
      {
        assignedDriver: driver._id,
        status: "assigned",
      },
      {
        new: true,
        runValidators: false, // 🚫 do NOT run full validation here
      }
    )
      .populate("assignedDriver", "name phone email")
      .populate("user", "name email phone");

    return res.json({ success: true, waste: updated });
  } catch (err) {
    console.error("AssignDriver backend error:", err);
    return res
      .status(500)
      .json({ message: "Assignment failed", error: err.message });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const waste = await Waste.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!waste) {
      return res.status(404).json({ message: "Waste not found" });
    }

    res.status(200).json(waste);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



