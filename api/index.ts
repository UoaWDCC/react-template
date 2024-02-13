import express, { json } from 'express';
import cors from 'cors';
import { connect } from 'mongoose';
import { config } from 'dotenv';

// Import Routers
import helloRoutes from './routes/hello';
import authRoutes from './routes/auth';

const app = express();
config();

const databaseUrl: string = process.env.DATABASE_URL!;
connect(databaseUrl);

app.use(json());
app.use(cors());

// Routes
app.use('/hello', helloRoutes);
app.use('/auth', authRoutes);

const port = Number.parseInt(process.env.PORT || '3000');
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
