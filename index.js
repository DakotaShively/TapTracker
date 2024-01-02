const mongoose = require("mongoose");
const Tracker = require("./models/tracker");
const { MongoClient, ServerApiVersion } = require("mongodb");
const express = require("express");
const User = require("./models/user");

const app = express();
const PORT = process.env.PORT || 3000;
const uri =
	"mongodb+srv://dakota:babrEb-2kuvju@cluster0.ehy3slc.mongodb.net/?retryWrites=true&w=majority";

// Connect to MongoDB
async function connect() {
	try {
		await mongoose.connect(uri);
		console.log("Finalled connected thanks to youtube");
	} catch (error) {
		console.log(error);
	}
}
// mongoose.connect(uri, {
// 	useNewUrlParser: true,
// 	useUnifiedTopology: true,
// });

app.use(express.json());

// Create a new user
app.post("/api/users", async (req, res) => {
	const { username } = req.body;

	try {
		const newUser = await User.create({ username });
		res.status(201).json(newUser);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});
// Create a new tracker
app.post("/api/users/:userId/trackers", async (req, res) => {
	const { userId } = req.params;
	const { name } = req.body;

	try {
		const user = await User.findById(userId);
		const newTracker = await Tracker.create({ name });

		//Associate the new tracker with the user
		user.trackers.push(newTracker._id);
		await user.save();

		res.status(201).json(newTracker);
		// await newTracker.save();
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// // Create a simple route
// app.get("/", (req, res) => {
// 	res.send("Hello, this is your Express backend!");
// });

// Get all Trackers
app.get("/api/users/:userId/trackers", async (req, res) => {
	const { userId } = req.params;
	try {
		const trackers = await User.findById(userId).populate("trackers");
		res.json(user.trackers);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// Update count for a tracker
app.put("/api/trackers", async (req, res) => {
	const { id } = req.params;

	try {
		const tracker = await Tracker.findById(id);
		tracker.count += 1;
		await tracker.save();
		res.json(tracker);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// Start the server
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
