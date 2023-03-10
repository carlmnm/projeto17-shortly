import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import usersRouters from "./routers/usersRouters.js"
import shortenRouters from "./routers/shortenRouters.js"

//import routers from "./routers/index.routers.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use([usersRouters, shortenRouters]);

const port = process.env.PORT || 4010;
app.listen(port, () => console.log(`Server running in port: ${port}`));