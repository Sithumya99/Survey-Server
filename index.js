import express from 'express';
import { MessageHandler } from './messageHandler.js';
import { GlobalDatabase } from './GlobalDatabase.js';

// Initialize Firebase Database
GlobalDatabase.initializeDatabase();

// Express setup
const app = express();
app.use(express.json());

app.all('/:action', async (req, res) => {
    try {
        const { action } = req.params; // Get request type from URL
        const result = await MessageHandler.handleRequest(action, req.body);
        res.json({ success: true, result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start Express Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
