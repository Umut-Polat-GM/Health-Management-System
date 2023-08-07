const mongoose = require("mongoose")

const specializationSchema = new mongoose.Schema(
    {
        specialization: {
            type: String,
            required: true
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Specialization", specializationSchema);

