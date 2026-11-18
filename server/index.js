const express = require('express');

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

// Confirms that the API server is running.
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'ApplyTrack API is running',
  });
});

app.listen(port, () => {
  console.log(`ApplyTrack API listening on http://localhost:${port}`);
});