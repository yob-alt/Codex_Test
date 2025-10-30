import { Router } from 'express';
import { prisma } from '../utils/prisma';
import { PaymentGateway } from '@prisma/client';

const router = Router();

router.post('/webhook', async (req, res) => {
  const { orderId, gateway, status, amount } = req.body;
  if (!orderId || !gateway) {
    return res.status(400).json({ message: 'Missing orderId or gateway' });
  }
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { package: true }
  });
  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }
  const payment = await prisma.payment.upsert({
    where: { orderId: order.id },
    update: {
      status: status ?? 'SUCCESS',
      gateway: gateway as PaymentGateway,
      amount: amount ?? order.package?.priceTHB ?? 0,
      payload: req.body
    },
    create: {
      orderId: order.id,
      status: status ?? 'SUCCESS',
      gateway: gateway as PaymentGateway,
      amount: amount ?? 0,
      payload: req.body
    }
  });
  await prisma.order.update({
    where: { id: order.id },
    data: { status: 'Paid' }
  });
  res.json({ message: 'Webhook processed', payment });
});

export default router;
