const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();


// Get All Trainees

router.get("/", async (req, res) => {

    try {

        const trainees = await User.find({
            role: "trainee"
        });

        res.json(trainees);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// Add Trainee

router.post("/add", async (req, res) => {

    try {

        const {
            name,
            employeeNo,
            username,
            password,
            unit,
            joiningDate,
            requiredHours,
            requiredDays,
            status
        } = req.body;

        const existingUser =
            await User.findOne({ username });

        if (existingUser) {

            return res.status(400).json({
                message: "Username already exists"
            });

        }

        const hashedPassword =
            await bcrypt.hash(password, 10);

        const trainee =
            new User({

                name,
                employeeNo,
                username,
                password: hashedPassword,
                role: "trainee",
                unit,
                joiningDate,
                requiredHours,
                requiredDays,
                status

            });

        await trainee.save();

        res.status(201).json({
            message: "Trainee Added Successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});
router.delete("/delete/:id", async (req, res) => {

try {

    await User.findByIdAndDelete(
        req.params.id
    );

    res.json({
        message:
        "Trainee Deleted Successfully"
    });

}
catch (error) {

    res.status(500).json({
        message:
        error.message
    });

}

});
router.put("/update/:id", async (req, res) => {

try {

    const {
        name,
        employeeNo,
        username,
        unit,
        joiningDate,
        requiredHours,
        requiredDays,
        status
    } = req.body;

    const existingUser =
    await User.findOne({
        username
    });

    if (
        existingUser &&
        existingUser._id.toString() !== req.params.id
    ) {
        return res.status(400).json({
            message: "Username already exists"
        });
    }

    await User.findByIdAndUpdate(
        req.params.id,
        {
            name,
            employeeNo,
            username,
            unit,
            joiningDate,
            requiredHours,
            requiredDays,
            status
        }
    );

    res.json({
        message:
        "Trainee Updated Successfully"
    });

}
catch (error) {

    res.status(500).json({
        message: error.message
    });

}
});
module.exports = router;
