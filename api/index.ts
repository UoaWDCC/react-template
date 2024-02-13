import express, { json } from 'express';
import cors from 'cors';
import { connect } from 'mongoose';
import { config } from 'dotenv';

// Import Routers
import helloRoutes from './routes/hello';
import authRoutes from './routes/auth';
import userRoutes from './routes/user';

const app = express();
config();

const databaseUrl: string = process.env.DATABASE_URL!;
connect(databaseUrl);

app.use(json());
app.use(cors());
app.use(express.static('public'));

// Routes
app.use('/hello', helloRoutes);
app.use('/auth', authRoutes);
app.use('/user', userRoutes);

const port = Number.parseInt(process.env.PORT || '3000');
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
