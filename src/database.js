import mysql from "mysql2"
import dotenv from "dotenv"

dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
}).promise();

export async function getCertificates() {
    const [rows] = await pool.query("SELECT * FROM certificates");
    return rows
}

