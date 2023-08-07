const mongoose = require("mongoose")

const doctorSchema = new mongoose.Schema(
  {
   
    firstName: {
      type: String,
      required: false
    },
    lastName: {
      type: String,
      required: false
    },
    phone: {
      type: String,
      required: false
    },
    
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },

    specializationId: {
      type: mongoose.Schema.Types.ObjectId,
       ref: 'Specialization',//clienttan specializationIdın id si gelecek
    },
    
    status: {
      type: String,
      default: "pending",
    },
  },
  { timestamps: true }
);
// doctorSchema.virtual('specialization', {
//   ref: 'Specialization',
//   localField: '_id',
//   foreignField: 'specializationId',
// })
// doctorSchema.virtual('user', {
//   ref: 'Specialization',
//   localField: '_id',
//   foreignField: 'userId',
// })
//await Doctor.populate(specialization).execPopulate() //çağırdığın yerde altına yaz


module.exports = mongoose.model("Doctor", doctorSchema);

