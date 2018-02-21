var mongoose=require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var userSchema= new mongoose.Schema({
   email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true
    },
    pincode: {
        type: Number,
        default: 110018
    },
    role: {
        type: String,
        enum: ["seeker", "mentor", "ngo"]
    },
     password: {
        type: String
    },
    username: {
        type: String
    },

     phone: {
        type: String
    }
});
userSchema.plugin(passportLocalMongoose)
module.exports= mongoose.model("User",userSchema);