const mongoose = require("mongoose")

const SpecializationSchema = new mongoose.Schema(
    {
        specializationId: {
            type: String,
        },
        specialization: {
            type: String,
            required: true
        },


    },
    { timestamps: true }
);

module.exports = mongoose.model("Specialization", SpecializationSchema);

