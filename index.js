const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv")
const mongoose = require("mongoose");
const { Resend } = require("resend")

const app = express();
const resend = new Resend("re_YoP6VaTh_MvSLWE5xbnMJxh53isWMSFzq")
dotenv.config();

const PORT = process.env.PORT || 3000;

const CONNECTION = process.env.CONNECTION;

mongoose.connect(CONNECTION)
    .then(() => console.log("Connected to DB"))
    .catch(error => console.log("Connection Error ", error))

app.use(cors({
    origin: "https://reydavid1500.github.io",
    preflightContinue: true,
}));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post('/contact', (req, res) => {
    const { from, to, subject, html } = req.body;

    resend.emails
        .send({
            from,
            to,
            subject,
            html,
        })
        .then(() => {
            res.json({ success: true });
        })
        .catch((error) => {
            console.error('Failed to send email:', error);
            res.json({ success: false, error: error.message });
        });
});


app.listen(PORT, () => console.log("Server OK in port " + PORT))