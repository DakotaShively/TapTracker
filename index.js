const mongoose = require("mongoose");
const Tracker = require("./models/tracker");
const { MongoClient, ServerApiVersion } = require("mongodb");
const express = require("express");

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

// Create a new tracker
app.post("/api/trackers", async (req, res) => {
	const { id, name, count } = req.body;

	try {
		const newTracker = await Tracker.create({ name });
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
app.get("/api/trackers", async (req, res) => {
	try {
		const trackers = await Tracker.find();
		res.json(trackers);
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
