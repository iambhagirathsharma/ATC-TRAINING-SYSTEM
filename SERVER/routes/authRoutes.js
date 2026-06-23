const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();


// ================= REGISTER =================

router.post("/register", async (req, res) => {

    try {

        const {
            name,
            employeeNo,
            username,
            password,
            role,
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

        if (existingUser) {

            return res.status(400).json({
                message: "Username already exists"
            });

        }

        const hashedPassword =
            await bcrypt.hash(password, 10);

        const user =
            new User({

                name,
                employeeNo,
                username,
                password: hashedPassword,
                role,
                unit,
                joiningDate,
                requiredHours,
                requiredDays,
                status

            });

        await user.save();

        res.status(201).json({
            message: "User Registered Successfully"
        });

    }
    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// ================= LOGIN =================

router.post("/login", async (req, res) => {

    try {

        const {
            username,
            password
        } = req.body;

        const user =
            await User.findOne({
                username
            });

        if (!user) {

            return res.status(400).json({
                message: "User not found"
            });

        }

        const isMatch =
            await bcrypt.compare(
                password,
                user.password
            );

        if (!isMatch) {

            return res.status(400).json({
                message: "Invalid Password"
            });

        }

        const token =
            jwt.sign(
                {
                    id: user._id,
                    role: user.role
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "7d"
                }
            );

        res.json({

            token,

            user: {
                id: user._id,
                name: user.name,
                employeeNo: user.employeeNo,
                role: user.role,
                unit: user.unit,
                status: user.status
            }

        });

    }
    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

module.exports = router;