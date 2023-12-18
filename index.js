const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv")
const { Resend } = require("resend")

dotenv.config();

const RESEND_API_KEY = process.env.RESEND_API_KEY

const app = express();
const resend = new Resend(RESEND_API_KEY)

const PORT = process.env.PORT || 3000;

app.use(cors());
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