'use client';

import { useState } from 'react';
import api from '../lib/api';
import { Order } from '../lib/types';
import toast from 'react-hot-toast';

const PAYMENT_QR_URL = process.env.NEXT_PUBLIC_PAYMENT_QR_URL ??
  'https://dummyimage.com/300x300/2563eb/ffffff.png&text=Scan+to+Pay';

export default function PaymentMethods({ order }: { order: Order }) {
  const [loading, setLoading] = useState(false);

  const simulatePayment = async (gateway: 'PROMPTPAY' | 'TRUEMONEY') => {
    try {
      setLoading(true);
      await api.post('/api/payments/webhook', {
        orderId: order.id,
        gateway,
        amount: order.package.priceTHB,
        status: 'SUCCESS'
      });
      toast.success('Payment received!');
    } catch (error) {
      toast.error('Failed to send webhook');
    } finally {
      setLoading(false);
    }
  };

  return (
    <aside className="card space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-white">Pay with QR</h2>
        <p className="text-xs text-slate-400">Scan using PromptPay or TrueMoney. Once payment completes, click simulate.</p>
      </div>
      <img src={PAYMENT_QR_URL} alt="Payment QR" className="w-full rounded-lg border border-slate-800" />
      <div className="space-y-2">
        <button
          className="btn-primary w-full"
          disabled={loading}
          onClick={() => simulatePayment('PROMPTPAY')}
        >
          Simulate PromptPay webhook
        </button>
        <button
          className="w-full rounded-md border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-800"
          disabled={loading}
          onClick={() => simulatePayment('TRUEMONEY')}
        >
          Simulate TrueMoney webhook
        </button>
      </div>
    </aside>
  );
}
