import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { Resend } from "resend";
import { getCertificates } from "./database.js";

dotenv.config();

const RESEND_API_KEY = process.env.RESEND_API_KEY

const app = express();
const resend = new Resend(RESEND_API_KEY)

const PORT = process.env.MYSQLPORT || 3000;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/certificates', async (req, res) => {
    const certificates = await getCertificates()
    res.send(certificates);
})

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