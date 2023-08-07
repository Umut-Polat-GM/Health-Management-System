const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: false,
        unique: true,//bir kişi tarafından kullanılır
    },
    password: {
        type: String,
        required: false,
    },
    isDoctor: {
        type: Boolean,
        default: false,
    },
    notification: {
        type: Array,
        default: [],
    },
    seennotification: {
        type: Array,
        default: [],
    }

}, { timestamps: true })

module.exports = mongoose.model("User", userSchema)