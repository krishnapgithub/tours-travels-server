const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/bookings", (req, res) => {
    const booking = req.body;

    let bookings = [];

    if (fs.existsSync("bookings.json")) {
        const data = fs.readFileSync("bookings.json");
        bookings = JSON.parse(data);
    }

    bookings.push({
        ...booking,
        createdAt: new Date().toISOString()
    });

    fs.writeFileSync(
        "bookings.json",
        JSON.stringify(bookings, null, 2)
    );

    console.log("Booking Saved:", booking);

    res.json({
        message: "Booking saved successfully"
    });
});

app.get("/api/bookings", (req, res) => {
    if (!fs.existsSync("bookings.json")) {
        return res.json([]);
    }

    const data = fs.readFileSync("bookings.json");
    const bookings = JSON.parse(data);

    res.json(bookings);
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});