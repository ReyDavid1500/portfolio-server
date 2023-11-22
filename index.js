const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv")
const mongoose = require("mongoose");
const Message = require("./models/message");

const app = express();
dotenv.config(); // Hacer configuración! 

const PORT = process.env.PORT || 3000;

const CONNECTION = process.env.CONNECTION;

mongoose.connect(CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to DB"))
    .catch(error => console.log("Connection Error ", error))

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post("/", (req, res) => {
    const message = new Message({
        name: req.body.name,
        email: req.body.email,
        message: req.body.message,
    })

    message.save();

    res.json(message);
})

app.listen(PORT, () => console.log("Server OK in port " + PORT))