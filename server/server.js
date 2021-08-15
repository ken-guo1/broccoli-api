import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
//routes
import authRoute from "./routes/authRoute";


dotenv.config();
const app = express();
app.use(cors());
app.options('*', cors());

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.set('trust proxy', 1);
app.use(session({
   secret: 'secret',
   resave: false,
   saveUninitialized: true,
   cookie: { secure: true} 
}));


//routes middleware
app.use("/api/auth", authRoute);

const port = process.env.NODE_PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});