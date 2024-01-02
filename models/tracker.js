const mongoose = require("mongoose");
// Define the MongoDB Schema and Model
const trackerSchema = new mongoose.Schema({
	name: String,
	count: { type: Number, default: 0 },
});

const Tracker = mongoose.model("Tracker", trackerSchema);

module.exports = Tracker;
