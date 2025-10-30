import { Router } from 'express';
import { prisma } from '../utils/prisma';
import { authenticate, requireAdmin } from '../middleware/auth';

const router = Router();

router.get('/', async (_req, res) => {
  const games = await prisma.game.findMany({
    orderBy: { createdAt: 'desc' }
  });
  res.json(games);
});

router.get('/:id', async (req, res) => {
  const game = await prisma.game.findUnique({ where: { id: req.params.id } });
  if (!game) {
    return res.status(404).json({ message: 'Game not found' });
  }
  res.json(game);
});

router.get('/:id/packages', async (req, res) => {
  const packages = await prisma.package.findMany({
    where: { gameId: req.params.id },
    orderBy: { priceTHB: 'asc' }
  });
  res.json(packages);
});

router.post('/', authenticate, requireAdmin, async (req, res) => {
  const { name, uidLabel, imageUrl, category } = req.body;
  if (!name || !uidLabel || !imageUrl || !category) {
    return res.status(400).json({ message: 'Missing fields' });
  }
  const game = await prisma.game.create({
    data: { name, uidLabel, imageUrl, category }
  });
  res.status(201).json(game);
});

export default router;
