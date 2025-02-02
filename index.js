import dotenv from "dotenv"
dotenv.config({
    path: './.env'
})
import { app } from "./app.js";
import { connection } from "./connection/db.js";

connection().then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log('Server is running on port',process.env.PORT);
    })
}).catch((err)=>{
    console.log(err)
})