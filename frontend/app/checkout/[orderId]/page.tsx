import PaymentMethods from '../../../components/payment-methods';
import OrderStatusCard from '../../../components/order-status-card';
import api from '../../../lib/api';
import { Order } from '../../../lib/types';

async function getOrder(orderId: string) {
  const res = await api.get<Order>(`/api/orders/${orderId}`);
  return res.data;
}

export default async function CheckoutOrderPage({ params }: { params: { orderId: string } }) {
  const order = await getOrder(params.orderId);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="grid gap-6 md:grid-cols-[2fr,1fr]">
        <OrderStatusCard order={order} />
        <PaymentMethods order={order} />
      </div>
    </div>
  );
}
