const mongoose =
require("mongoose");

const userSchema =
new mongoose.Schema({

    name:{
        type:String,
        required:true
    },

    employeeNo:{
        type:String,
        required:true,
        unique:true
    },

    username:{
        type:String,
        required:true,
        unique:true
    },

    password:{
        type:String,
        required:true
    },

    role:{
        type:String,
        enum:[
            "admin",
            "trainee"
        ],
        default:"trainee"
    },

    unit:{
        type:String
    },

    joiningDate:{
        type:Date
    },

    requiredHours:{
        type:Number,
        default:180
    },

    requiredDays:{
        type:Number,
        default:90
    },

    status:{
        type:String,
        default:"Active"
    }

},
{
timestamps:true
});

module.exports =
mongoose.model(
"User",
userSchema
);