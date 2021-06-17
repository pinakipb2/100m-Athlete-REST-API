const express = require('express');
const env = require('dotenv');
const path = require("path");
require("./db/conn");
const router = require("./routers/api")

env.config();
const app = express();
app.use(express.json());
app.use(router);

app.get("",(req,res) => {
    res.sendFile(path.join(__dirname,'../public/index.html'));
});

app.get("/images/runner.png",(req,res) => {
    res.sendFile(path.join(__dirname,'../public/images/runner.png'));
});

// SERVER
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});