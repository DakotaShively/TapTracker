// models/user.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
	},
	trackers: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Tracker",
		},
	],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
