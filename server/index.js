const express  = require("express");
const cors  = require("cors");
const cookieParser  = require("cookie-parser");
const bodyParser  = require("body-parser");
const dotenv  = require("dotenv").config();
const db = require("./config/db.js")
const authRoute = require("./routes/authRoutes.js")

const app = express();

app.use(bodyParser.json({limit:"30 mb", extended:true}))
app.use(bodyParser.urlencoded({limit:"30 mb", extended:true}))
app.use(cookieParser()) 
app.use(cors())
app.get("/",(req,res)=>{
    res.send("hello world")
})


db();

app.use("api/auth",authRoute)


app.listen(process.env.Port, () => {
    console.log('Server is running on port 3001');
});