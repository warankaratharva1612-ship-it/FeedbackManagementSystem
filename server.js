const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Database Connection (FIXED)
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',                 // blank password as per your setup
    database: 'college_feedback',
    port: 3307                    // MySQL running on 3307
});

db.connect(err => {
    if (err) {
        console.error("Database connection failed:", err);
        return;
    }
    console.log("Connected to MySQL Database");
});

// Test route
app.get('/', (req, res) => {
    res.send("Backend is running");
});

// Feedback API (MAPPED TO YOUR FORM FIELDS)
app.post('/feedback', (req, res) => {

    const data = req.body;

    const sql = `
        INSERT INTO feedback (name, email, rating, message)
        VALUES (?, ?, ?, ?)
    `;

    // Map form fields -> database columns
    const name = data.student_name || null;
    const email = data.student_email || null;
    const rating = data.q13_overall || null;       // overall rating
    const message = data.q15_comments || null;     // comments

    db.query(sql, [name, email, rating, message], (err) => {
        if (err) {
            console.error("Insert error:", err);
            return res.status(500).send("Error saving data");
        }
        res.json({ message: "Data saved successfully!" });
    });
});
app.get('/all-feedback', (req, res) => {
    db.query("SELECT * FROM feedback ORDER BY created_at DESC", (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Database error");
        }
        res.json(results);
    });
});


// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});