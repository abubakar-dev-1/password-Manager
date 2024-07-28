const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const passSchema = require('./schemas/passwordSchema');
dotenv.config();

// Middleware
app.use(express.json()); // to parse JSON bodies
app.use(cors({
  origin: 'http://127.0.0.1:5173',
}));

// Connect to MongoDB
mongoose.connect(process.env.Database_connection_string)
  .then(() => {
    console.log('Connected to my password manager database 👌');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB', error);
  });

// GET all passwords
app.get('/allpasswords', async (req, res) => {
  try {
    const allPasswords = await passSchema.find({});
    res.status(200).send(allPasswords);
  } catch (error) {
    console.log('Error fetching passwords', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

// POST a new password
app.post('/allpasswords', async (req, res) => {
  const { siteUrl, actualPassword, siteName, userName } = req.body;
  
  if (!siteUrl || !actualPassword || !siteName ) {
    return res.status(400).send({ message: 'Missing required fields' });
  }

  try {
    const newPassword = new passSchema({ siteUrl, actualPassword, siteName, userName });
    await newPassword.save();
    res.status(201).send(newPassword);
  } catch (error) {
    console.log('Error saving password', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

app.put('/allpasswords/:id', async (req, res) => {
  const { id } = req.params; // Get the ID from the URL parameters
  const { siteUrl, actualPassword, siteName, userName } = req.body; // Get the new data from the request body

  // Check for required fields
  if (!siteUrl || !actualPassword || !siteName) {
    return res.status(400).send({ message: 'Missing required fields' });
  }

  try {
    const updatedPassword = await passSchema.findByIdAndUpdate(id, { siteUrl, actualPassword, siteName, userName }, { new: true });
    
    if (!updatedPassword) {
      return res.status(404).send({ message: 'Password not found' });
    }

    res.status(200).send(updatedPassword);
  } catch (error) {
    console.log('Error updating password', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

app.delete('/allpasswords/:id', async (req, res) => {
  const { id } = req.params; // Get the ID from the URL parameters

  console.log(id)

  try {
    const deletedPassword = await passSchema.findByIdAndDelete(id);
    if (!deletedPassword) {
      return res.status(404).send({ message: 'Password not found' });
    }
    res.status(200).send({ message: 'Password deleted successfully' });
  } catch (error) {
    console.log('Error deleting password', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port} 😂😊😂🤦‍♀️`);
});
