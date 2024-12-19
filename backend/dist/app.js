"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const database_1 = require("./config/database");
const routes_1 = __importDefault(require("./routes"));
const seed_1 = require("./config/seed"); // Import the seeding logic
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.use('/api', routes_1.default);
// Health check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});
const PORT = process.env.PORT ?? 3000;
const startServer = async () => {
    try {
        console.log('Connecting to database...');
        await (0, database_1.connectDB)();
        console.log('Database connection established.');
        console.log('Seeding database...');
        await (0, seed_1.seedDatabase)(); // Seed the database before starting the server
        console.log('Database seeded successfully.');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    }
    catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};
startServer();
exports.default = app;
