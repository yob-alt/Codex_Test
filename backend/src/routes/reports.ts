import { Router } from 'express';
import { authenticate, requireAdmin } from '../middleware/auth';
import { prisma } from '../utils/prisma';
import { subDays, format } from 'date-fns';

const router = Router();

router.get('/', authenticate, requireAdmin, async (_req, res) => {
  const today = new Date();
  const days = Array.from({ length: 7 }, (_, index) => subDays(today, index)).reverse();

  const data = await Promise.all(
    days.map(async (day) => {
      const start = new Date(day.setHours(0, 0, 0, 0));
      const end = new Date(day.setHours(23, 59, 59, 999));
      const payments = await prisma.payment.findMany({
        where: {
          createdAt: {
            gte: start,
            lte: end
          }
        }
      });
      const revenue = payments.reduce((sum, payment) => sum + payment.amount, 0);
      return {
        date: format(start, 'MMM d'),
        revenue,
        orders: payments.length
      };
    })
  );

  res.json(data);
});

export default router;
