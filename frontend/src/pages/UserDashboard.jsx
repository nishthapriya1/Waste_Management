import React, { useEffect, useState } from "react";
import api from "../api/axios";
import Sidebar from "../components/Sidebar";
import { HiOutlineMenu } from "react-icons/hi";
import { Link } from "react-router-dom";

export default function UserDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  // Address
  const [houseOrFlat, setHouseOrFlat] = useState("");
  const [street, setStreet] = useState("");
  const [area, setArea] = useState("");
  const [city, setCity] = useState("");
  const [stateField, setStateField] = useState("");
  const [pincode, setPincode] = useState("");

  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");

  const [image, setImage] = useState(null);
  const [useLiveLocation, setUseLiveLocation] = useState(false);

  const [pickupDate, setPickupDate] = useState("");
  const [pickupTimeSlot, setPickupTimeSlot] = useState("");

  const [wastes, setWastes] = useState([]);
  const [errors, setErrors] = useState({});

  const fetchWastes = async () => {
    try {
      const res = await api.get("/waste/all");
      setWastes(res.data);
    } catch (err) {
      console.error("Error fetching wastes", err);
    }
  };

  useEffect(() => {
    fetchWastes();
  }, []);

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLat(pos.coords.latitude);
        setLng(pos.coords.longitude);
        alert("Location captured");
      },
      (err) => alert(err.message)
    );
  };

  const submit = async () => {
    const newErrors = {};
    if (!category) newErrors.category = "Category is required";
    if (!description.trim()) newErrors.description = "Description is required";
    if (!pickupDate) newErrors.pickupDate = "Pickup date is required";
    if (!pickupTimeSlot) newErrors.pickupTimeSlot = "Time slot is required";

    if (!useLiveLocation) {
      if (!houseOrFlat.trim()) newErrors.houseOrFlat = "House / Flat is required";
      if (!street.trim()) newErrors.street = "Street is required";
      if (!area.trim()) newErrors.area = "Area is required";
      if (!city.trim()) newErrors.city = "City is required";
      if (!stateField.trim()) newErrors.stateField = "State is required";
      if (!pincode.trim()) newErrors.pincode = "Pincode is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const formData = new FormData();
    formData.append("category", category);
    formData.append("description", description);
    formData.append("pickupDate", pickupDate);
    formData.append("pickupTimeSlot", pickupTimeSlot);
    if (image) formData.append("image", image);

    formData.append("address[houseOrFlat]", houseOrFlat);
    formData.append("address[street]", street);
    formData.append("address[area]", area);
    formData.append("address[city]", city);
    formData.append("address[state]", stateField);
    formData.append("address[pincode]", pincode);

    if (lat && lng) {
      formData.append("address[lat]", lat);
      formData.append("address[lng]", lng);
    }

    try {
      setErrors({});
      await api.post("/waste/create", formData);
      alert("Waste submitted");
      fetchWastes();

      setCategory("");
      setDescription("");
      setHouseOrFlat("");
      setStreet("");
      setArea("");
      setCity("");
      setStateField("");
      setPincode("");
      setImage(null);
      setLat("");
      setLng("");
      setUseLiveLocation(false);
      setPickupDate("");
      setPickupTimeSlot("");
    } catch (err) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      } else {
        alert("Error submitting waste");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
     {/* Navbar */}
<div className="flex items-center bg-indigo-600 text-white p-4 shadow">
  {/* Left: menu button */}
  <div className="w-1/3">
    <HiOutlineMenu
      size={26}
      className="cursor-pointer"
      onClick={() => setIsSidebarOpen(true)}
    />
  </div>

  {/* Center: title */}
  <div className="w-1/3 text-center">
    <h1 className="text-xl font-bold">User Dashboard</h1>
  </div>

  {/* Right: placeholder empty (for symmetry) */}
  <div className="w-1/3"></div>
</div>


      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content */}
      <div className="px-6 py-8 max-w-4xl mx-auto">

        {/* === Form Section === */}
        <div className="bg-white shadow-md rounded-lg p-6 space-y-4">

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md"
            >
              <option value="">Select category</option>
              <option value="electronic">Electronic Waste</option>
              <option value="paper">Paper Waste</option>
              <option value="cloth">Cloth Waste</option>
              <option value="medical">Medical Waste</option>
            </select>
            {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 w-full border-gray-300 rounded-md"
              rows="3"
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
          </div>

          {/* Live Location */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={useLiveLocation}
              onChange={() => setUseLiveLocation(!useLiveLocation)}
              className="h-4 w-4"
            />
            <label className="text-sm text-gray-700">Use Live Location</label>
          </div>

          {useLiveLocation && (
            <button
              onClick={getLocation}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md"
            >
              Capture Location
            </button>
          )}

          {/* Address Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <input
                value={houseOrFlat}
                onChange={(e) => setHouseOrFlat(e.target.value)}
                placeholder="House/Flat"
                className="border-gray-300 rounded-md w-full"
              />
              {errors.houseOrFlat && <p className="text-red-500 text-sm">{errors.houseOrFlat}</p>}
            </div>
            <div>
              <input
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                placeholder="Street"
                className="border-gray-300 rounded-md w-full"
              />
              {errors.street && <p className="text-red-500 text-sm">{errors.street}</p>}
            </div>
            <div>
              <input
                value={area}
                onChange={(e) => setArea(e.target.value)}
                placeholder="Area"
                className="border-gray-300 rounded-md w-full"
              />
              {errors.area && <p className="text-red-500 text-sm">{errors.area}</p>}
            </div>
            <div>
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City"
                className="border-gray-300 rounded-md w-full"
              />
              {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
            </div>
            <div>
              <input
                value={stateField}
                onChange={(e) => setStateField(e.target.value)}
                placeholder="State"
                className="border-gray-300 rounded-md w-full"
              />
              {errors.stateField && <p className="text-red-500 text-sm">{errors.stateField}</p>}
            </div>
            <div>
              <input
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder="Pincode"
                className="border-gray-300 rounded-md w-full"
              />
              {errors.pincode && <p className="text-red-500 text-sm">{errors.pincode}</p>}
            </div>

            {/* Pickup Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Pickup Date</label>
              <input
                type="date"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                className="mt-1 w-full border-gray-300 rounded-md"
              />
              {errors.pickupDate && <p className="text-red-500 text-sm">{errors.pickupDate}</p>}
            </div>

            {/* Time Slot */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Time Slot</label>
              <select
                value={pickupTimeSlot}
                onChange={(e) => setPickupTimeSlot(e.target.value)}
                className="mt-1 w-full border-gray-300 rounded-md"
              >
                <option value="">Select a time slot</option>
                <option value="08:00-10:00">08:00 AM - 10:00 AM</option>
                <option value="10:00-12:00">10:00 AM - 12:00 PM</option>
                <option value="12:00-14:00">12:00 PM - 02:00 PM</option>
                <option value="14:00-16:00">02:00 PM - 04:00 PM</option>
                <option value="16:00-18:00">04:00 PM - 06:00 PM</option>
              </select>
              {errors.pickupTimeSlot && <p className="text-red-500 text-sm">{errors.pickupTimeSlot}</p>}
            </div>

            {/* Image */}
            <div>
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>

            <button
              onClick={submit}
              className="w-full bg-green-600 text-white py-2 rounded-md"
            >
              Submit
            </button>
          </div>

      
        </div>

      </div>
    </div>
  );
}
