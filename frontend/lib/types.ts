export type Game = {
  id: string;
  name: string;
  uidLabel: string;
  imageUrl: string;
  category: string;
};

export type Package = {
  id: string;
  title: string;
  priceTHB: number;
  coinAmount: number;
  gameId: string;
};

export type Order = {
  id: string;
  uid: string;
  status: 'Pending' | 'Paid' | 'Delivered' | 'Cancelled';
  paymentMethod: 'PROMPTPAY' | 'TRUEMONEY';
  txRef: string;
  createdAt: string;
  package: Package;
  game: Game;
  payment?: {
    gateway: string;
    status: string;
    amount: number;
  };
};

export type AuthResponse = {
  token: string;
};
