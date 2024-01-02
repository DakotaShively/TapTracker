const mongoose = require("mongoose");
const Tracker = require("./models/tracker");
// const express = require("./models/tracker");
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/TapTracker", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

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
app.put("/api/trackers/:id", async (req, res) => {
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

app.use(express.json());

// Create a simple route
app.get("/", (req, res) => {
	res.send("Hello, this is your Express backend!");
});

// Start the server
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
