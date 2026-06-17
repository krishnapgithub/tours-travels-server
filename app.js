const Booking = require("./models/Booking");
const express = require("express");
const cors = require("cors");
//const fs = require("fs");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("✅ MongoDB Connected");
    })
    .catch((err) => {
        console.error("❌ MongoDB Connection Error:", err);
    });


app.get("/api/bookings", async (req, res) => {
    try {
        console.log("Fetching from MongoDB...");

        const bookings = await Booking.find()
            .sort({ createdAt: -1 });

        console.log(bookings);

        res.json(bookings);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Error fetching bookings"
        });
    }
});

app.post("/api/bookings", async (req, res) => {
    try {
        console.log("Received Data:", req.body);

        const booking = new Booking(req.body);

        await booking.save();

        console.log("Booking Saved To MongoDB");

        res.json({
            success: true,
            message: "Booking saved successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Error saving booking"
        });
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});