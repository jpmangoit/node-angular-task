const express = require('express');
const path = require('path');
const app = express();
const Routes = require('./routes/index-route')
const dotenv = require("dotenv");
dotenv.config()
const PORT = process.env.PORT || 3000;

// Serve static files (e.g., images)
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Use custom routes
app.use('/api', Routes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
