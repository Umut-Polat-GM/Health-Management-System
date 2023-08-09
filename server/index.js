const express  = require("express");
const cors  = require("cors");
const cookieParser  = require("cookie-parser");
const bodyParser  = require("body-parser");
const dotenv  = require("dotenv");
const db = require("./config/db.js")
const authRoute = require("./routes/authRoutes.js")
const userRoute = require("./routes/userRoutes.js")
const adminRoute = require("./routes/adminRoute.js")
dotenv.config()

const app = express();

app.use(cors())
app.use(express.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({limit:"30 mb", extended:true}))
// app.use(express.json());
app.use(cookieParser()) 


db();

app.use("/api/auths",authRoute)
app.use("/api/users",userRoute)
app.use("/api/admin",adminRoute)

app.listen(process.env.PORT, () => {
    console.log('Server is running on port: ', process.env.PORT);
});