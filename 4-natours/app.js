const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.status(200).json({ message: `it's working!`, app: 'Natours' });
});

app.post('/', (req, res) => {
  res.send('Post endpoint');
});

const port = 3000;
app.listen(port, () => {
  console.log(`🚀 App running on port ${port}...`);
});
