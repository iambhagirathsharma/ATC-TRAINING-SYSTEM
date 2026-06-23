const mongoose = require("mongoose");

const attendanceSchema =
new mongoose.Schema(
{
    traineeId:
{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:false
},

    date:
    {
        type:Date,
        required:true
    },

    arrivalTime:
    {
        type:String,
        required:true
    },

    departureTime:
    {
        type:String,
        required:true
    },

    totalHours:
    {
        type:Number,
        default:0
    },

    status:
    {
        type:String,
        default:"Present"
    }
},
{
    timestamps:true
});

module.exports =
mongoose.model(
    "Attendance",
    attendanceSchema
);