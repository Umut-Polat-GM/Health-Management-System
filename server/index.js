const express  = require("express");
const cors  = require("cors");
const cookieParser  = require("cookie-parser");
const bodyParser  = require("body-parser");
const dotenv  = require("dotenv");
const db = require("./config/db.js")
const authRoute = require("./routes/authRoutes.js")
const userRoute = require("./routes/userRoutes.js")
const adminRoute = require("./routes/adminRoute.js")
const rateLimiter = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');


dotenv.config()

const app = express();

app.set('trust proxy', 1);//bu ayar gerçek IP adreslerini almanıza yardımcı olur
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  })
);
app.use(helmet());//. Helmet kullanarak uygulamanızın güvenliğini artırabilirsiniz.
app.use(xss()); //Bu sayede XSS (Cross-Site Scripting) saldırılarına karşı koruma sağlar.
app.use(mongoSanitize());// gelen istek verilerini temizlerken MongoDB sorgularındaki potansiyel güvenlik açıklarını gideri

app.use(cors({
    origin: 'http://localhost:5173', // React uygulamanızın adresi
    credentials: true, // Çerezlerin paylaşılmasını etkinleştir
  }))

app.use(express.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({limit:"30 mb", extended:true}))
// app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));


db();

app.use("/api/auths",authRoute)
app.use("/api/users",userRoute)
app.use("/api/admin",adminRoute)



app.listen(process.env.PORT, () => {
    console.log('Server is running on port: ', process.env.PORT);
});