import { Router } from 'express';
import { prisma } from '../utils/prisma';
import { authenticate, requireAdmin } from '../middleware/auth';

const router = Router();

router.post('/', authenticate, requireAdmin, async (req, res) => {
  const { gameId, title, priceTHB, coinAmount } = req.body;
  if (!gameId || !title || !priceTHB || !coinAmount) {
    return res.status(400).json({ message: 'Missing fields' });
  }
  const pkg = await prisma.package.create({
    data: {
      gameId,
      title,
      priceTHB: Number(priceTHB),
      coinAmount: Number(coinAmount)
    },
    include: { game: true }
  });
  res.status(201).json(pkg);
});

router.get('/', authenticate, requireAdmin, async (_req, res) => {
  const packages = await prisma.package.findMany({
    include: { game: true },
    orderBy: { createdAt: 'desc' }
  });
  res.json(packages);
});

export default router;
