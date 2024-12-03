const express = require('express');
const cors = require('cors');
const projectRoutes = require('./routes/projects'); // Import project routes

const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse incoming JSON requests

// Mount the /api/projects route
app.use('/api/projects', projectRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
