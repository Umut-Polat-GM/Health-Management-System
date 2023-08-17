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
    isVerified: {
        type: Boolean,
        default: false,
    },
    verified: {
        type: Date,
    },
    verificationToken: {//bu email verify işlemi için gerekli
        type: String,
    },
    notification: {
        type: Array,
        default: [],
    },
    seennotification: {
        type: Array,
        default: [],
    },
    /*alt kısımlar forgot password için zaman kontrolu için gerekli*/
    passwordToken: {
        type: String,
        default: null,
    },
    passwordTokenExpirationDate: {
        type: Date,
        default: null,
    },
    tokens: [{ type: Object }],//kullanıcı işlemleri login olduktan sonra tanımlanan ana token
}, { timestamps: true })

module.exports = mongoose.model("User", userSchema)