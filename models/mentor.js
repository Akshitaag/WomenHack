var mongoose=require("mongoose");

var mentorSchema= new mongoose.Schema({
   email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true
    },
    pincode: {
        type: String
    },
     phone: {
        type: String
    },
    username: {
      id:{ 
         type:mongoose.Schema.Types.ObjectId,
         ref:"User"
      },
      username: String
   }
});
module.exports= mongoose.model("Mentor",mentorSchema);