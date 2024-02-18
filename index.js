const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const port = 3000;

// Middleware to parse JSON and URL-encoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// PostgreSQL database configuration
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Form',
  password: '99@#77',
  port: 5432, // Default PostgreSQL port
});

// Route to handle form submission
app.post('/submit-form', async (req, res) => {
  try {
    const {
      SelectEvent,
      groupLeaderName,
      collegeName,
      mobileNo,
      emailAddress,
      numMembers,
      member2,
      member3,
      member4
    } = req.body;

    // Insert data into PostgreSQL database
    const query = `
      INSERT INTO form_data (event, group_leader, college, mobile, email, num_members, member2, member3, member4)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    `;
    const values = [SelectEvent, groupLeaderName, collegeName, mobileNo, emailAddress, numMembers, member2, member3, member4];
    await pool.query(query, values);

    res.status(200).send('Form data stored successfully');
  } catch (error) {
    console.error('Error processing form submission:', error);
    res.status(500).send('An error occurred while processing the form');
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
