const express = require("express")
const mongoose = require("mongoose");
const authorRoutes = require("./routes/authorRoutes");
const bookRoutes = require("./routes/bookRoutes");
require('dotenv').config();

const app = express();

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Here is your server");
});

app.use("/authors", authorRoutes);

app.use("/books", bookRoutes);

// mongoose.set("strictQuery", false);

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Database Connected");

    app.listen("3000",()=>{
        console.log(`Server is up and running.Check here http://localhost:3000`);
    })
})