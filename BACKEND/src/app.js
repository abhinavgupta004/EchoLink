import express from "express";
import {createServer} from "http";

import {Server} from "socket.io";
import mongoose from "mongoose";
import cors from "cors";
import ConnectToSocket from "./controllers/socketManager.js";

import userRoutes from "./routes/users.routes.js";



const app = express();
const server = createServer(app);
const io = ConnectToSocket(server);

app.set("port", (process.env.PORT || 8080))
app.use(cors())
app.use(express.json({limit : "40kb"}))
app.use(express.urlencoded({limit: "40kb", extended: true}))
app.use("/api/v1/users", userRoutes);
const start = async () => {
    const connectionDb = mongoose.connect("mongodb+srv://abhimanyurock2004_db_user:CiCJYgos8LQZRQxG@cluster0.6qdrdif.mongodb.net/?appName=Cluster0")
    console.log(`MONGO Connected DB Host : ${(await connectionDb).connection.host}`)
server.listen(app.get("port"), (req,res)=> {
    console.log("port is listening")
})
}

start();