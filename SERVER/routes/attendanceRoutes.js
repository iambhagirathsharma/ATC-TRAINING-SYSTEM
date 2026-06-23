const express = require("express");
const Attendance = require("../models/Attendance");

const router = express.Router();


// Get All Attendance

router.get("/", async (req, res) => {

    try {

        const attendance =
        await Attendance.find()
        .populate(
            "traineeId",
            "name employeeNo"
        );

        res.json(attendance);

    }
    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// Add Attendance

router.post("/add", async (req, res) => {

    try {

        const attendance =
        new Attendance(req.body);

        await attendance.save();

        res.status(201).json({
            message:
            "Attendance Added Successfully"
        });

    }
    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

module.exports = router;