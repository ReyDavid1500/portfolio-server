// import mysql from "mysql2"
// import dotenv from "dotenv"

// dotenv.config();

// const pool = mysql.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DATABASE_NAME,
//     port: process.env.DB_PORT,
// }).promise();

// export async function getCertificates() {
//     const [rows] = await pool.query("SELECT * FROM certificates;");
//     console.log(rows)
//     return rows
// }

