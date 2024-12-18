import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { connectDB } from './config/database';
import router from './routes';
import { seedDatabase } from './config/seed'; // Import the seeding logic

const app: Express = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', router);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

const PORT = process.env.PORT ?? 3000;

const startServer = async () => {
  try {
    console.log('Connecting to database...');
    await connectDB();
    console.log('Database connection established.');

    console.log('Seeding database...');
    await seedDatabase(); // Seed the database before starting the server
    console.log('Database seeded successfully.');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;
