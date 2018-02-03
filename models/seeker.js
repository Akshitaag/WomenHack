var mongoose=require("mongoose");

var seekerSchema= new mongoose.Schema({
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
     problem:
    {
        type: String
    },
    helper:
    {
        type:String
    },
    share:
    {
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
module.exports= mongoose.model("Seeker",seekerSchema);