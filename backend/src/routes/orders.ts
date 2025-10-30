import { Router } from 'express';
import { prisma } from '../utils/prisma';
import { authenticate, requireAdmin } from '../middleware/auth';
import { PaymentGateway } from '@prisma/client';

const router = Router();

router.post('/', authenticate, async (req, res) => {
  const { packageId, gameId, uid, paymentMethod } = req.body;
  if (!packageId || !gameId || !uid || !paymentMethod) {
    return res.status(400).json({ message: 'Missing fields' });
  }
  const user = (req as any).user;
  const pkg = await prisma.package.findUnique({ where: { id: packageId } });
  if (!pkg) {
    return res.status(404).json({ message: 'Package not found' });
  }
  const order = await prisma.order.create({
    data: {
      userId: user.id,
      gameId,
      packageId,
      uid,
      paymentMethod: paymentMethod as PaymentGateway,
      status: 'Pending'
    },
    include: {
      package: true,
      game: true
    }
  });
  res.status(201).json({ order });
});

router.get('/me', authenticate, async (req, res) => {
  const user = (req as any).user;
  const orders = await prisma.order.findMany({
    where: { userId: user.id },
    include: {
      package: true,
      game: true,
      payment: true
    },
    orderBy: { createdAt: 'desc' }
  });
  res.json(orders);
});

router.get('/:id', async (req, res) => {
  const order = await prisma.order.findUnique({
    where: { id: req.params.id },
    include: {
      package: true,
      game: true,
      payment: true
    }
  });
  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }
  res.json(order);
});

router.get('/', authenticate, requireAdmin, async (_req, res) => {
  const orders = await prisma.order.findMany({
    include: {
      package: true,
      game: true,
      payment: true,
      user: { select: { email: true } }
    },
    orderBy: { createdAt: 'desc' }
  });
  res.json(orders);
});

router.patch('/:id', authenticate, requireAdmin, async (req, res) => {
  const { status } = req.body;
  const order = await prisma.order.update({
    where: { id: req.params.id },
    data: { status }
  });
  res.json(order);
});

export default router;
