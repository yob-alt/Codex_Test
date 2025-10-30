import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET ?? 'supersecretjwt';

interface Payload {
  id: string;
  email: string;
  name: string;
  role: 'USER' | 'ADMIN';
  walletBalance?: number;
}

export function signToken(payload: Payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}
