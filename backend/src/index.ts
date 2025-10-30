import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import gameRoutes from './routes/games';
import orderRoutes from './routes/orders';
import paymentRoutes from './routes/payments';
import packageRoutes from './routes/packages';
import reportRoutes from './routes/reports';
import { authenticate, requireAdmin } from './middleware/auth';

dotenv.config();

const app = express();

app.use(cors({ origin: '*', credentials: true }));
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'gamebro-api' });
});

app.use('/api/auth', authRoutes);
app.use('/api/games', gameRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/admin/packages', packageRoutes);
app.use('/api/admin/reports', reportRoutes);
app.use('/api/admin/orders', authenticate, requireAdmin, orderRoutes);
app.use('/api/admin/games', authenticate, requireAdmin, gameRoutes);

const port = Number(process.env.PORT ?? 4000);

app.listen(port, () => {
  console.log(`GameBro API running on http://localhost:${port}`);
});
