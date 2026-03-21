const db = require('../db/pool');

// Add a new train
const addTrain = async (req, res) => {
  const { train_number, train_name, source, destination, departure_time, arrival_time, total_seats } = req.body;
  
  try {
    if (!train_number || !train_name || !source || !destination || !departure_time || !arrival_time || !total_seats) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Convert stations to uppercase
    const result = await db.query(
      `INSERT INTO trains (train_number, train_name, source, destination, departure_time, arrival_time, total_seats) 
       VALUES ($1, $2, UPPER($3), UPPER($4), $5, $6, $7) RETURNING *`,
      [train_number, train_name, source, destination, departure_time, arrival_time, total_seats]
    );

    res.status(201).json({ message: 'Train added successfully', train: result.rows[0] });
  } catch (err) {
    console.error('Error adding train:', err);
    if (err.code === '23505') {
       return res.status(400).json({ error: 'Train number already exists' });
    }
    res.status(500).json({ error: 'Server error' });
  }
};

// Search trains between source and destination
const searchTrains = async (req, res) => {
  const { source, destination } = req.query;
  
  try {
    if (!source || !destination) {
      return res.status(400).json({ error: 'Source and destination parameters are required' });
    }

    const result = await db.query(
      'SELECT * FROM trains WHERE source = UPPER($1) AND destination = UPPER($2)',
      [source, destination]
    );

    res.json(result.rows);
  } catch (err) {
    console.error('Error searching trains:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { addTrain, searchTrains };
