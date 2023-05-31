const express = require('express');
const path = require('path');

const app = express();

// Serve static files from the current directory
const staticPath = path.join(__dirname, '');
app.use(express.static(staticPath));

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
