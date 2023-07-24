const mongoose = require("mongoose")

const db = ()=> {
    mongoose.connect(process.env.DB_URL , {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(()=>{
        console.log("connected to the DB succesully")
    }).catch((err)=>{
        console.log(`DB connection err: ${err}`)
    });
}

module.exports = db;