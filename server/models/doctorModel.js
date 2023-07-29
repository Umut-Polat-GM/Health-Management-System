const mongoose = require("mongoose")

const doctorSchema = new mongoose.Schema(
    {
      userId: {
        type: String,
      },
      firstName: {
        type: String,
        required: true
      },
      lastName: {
        type: String,
        required: true
      },
      phone: {
        type: String,
        required:true
      },
      email: {
        type: String,
        required: true,
        unique: true,//bir kişi tarafından kullanılır
      },
      address: {
        type: String,
        required: true
      },
      
      specialization: {
        type: String,
        required: true
      },
      experience: {
        type: String,
        required: true
      },
      feesPerCunsaltation: {
        type: Number,
        required: true
      },
      status: {
        type: String,
        default: "pending",
      },
      timings: {
        type: Object,
        required: true
      },
    },
    { timestamps: true }
  );
  
   module.exports =  mongoose.model("Doctor", doctorSchema);
   
  