import { PrismaClient, PaymentGateway, UserRole } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { formatISO } from 'date-fns';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL ?? 'admin@gamebro.gg';
  const adminPassword = process.env.ADMIN_PASSWORD ?? 'changeme';
  const hash = await bcrypt.hash(adminPassword, 10);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    create: {
      email: adminEmail,
      name: 'GameBro Admin',
      passwordHash: hash,
      role: UserRole.ADMIN,
      walletBalance: 0
    },
    update: {}
  });

  console.log('Admin ready:', admin.email);

  await prisma.user.upsert({
    where: { email: 'player@gamer.gg' },
    update: {},
    create: {
      name: 'Nok Superspeed',
      email: 'player@gamer.gg',
      passwordHash: await bcrypt.hash('password123', 10),
      walletBalance: 250
    }
  });

  const games = await prisma.$transaction(
    [
      {
        name: 'Mobile Legends: Bang Bang',
        uidLabel: 'Player ID',
        imageUrl: 'https://images.unsplash.com/photo-1580121027713-8b987cd5d7a6?auto=format&fit=crop&w=1200&q=80',
        category: 'MOBA'
      },
      {
        name: 'Free Fire MAX',
        uidLabel: 'Player UID',
        imageUrl: 'https://images.unsplash.com/photo-1606112219348-204d7d8b94ee?auto=format&fit=crop&w=1200&q=80',
        category: 'Battle Royale'
      },
      {
        name: 'Genshin Impact',
        uidLabel: 'Player UID',
        imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80',
        category: 'Adventure RPG'
      }
    ].map((game) =>
      prisma.game.upsert({
        where: { name: game.name },
        create: game,
        update: {}
      })
    )
  );

  const packages = await prisma.$transaction(
    [
      { title: 'Weekly Starlight', coinAmount: 250, priceTHB: 129 },
      { title: 'Epic Bundle', coinAmount: 550, priceTHB: 249 },
      { title: 'Mythic Crystals', coinAmount: 1150, priceTHB: 449 },
      { title: 'Starter Diamonds', coinAmount: 60, priceTHB: 35 },
      { title: 'Whale Pack', coinAmount: 3000, priceTHB: 999 }
    ].map((pkg, index) =>
      prisma.package.upsert({
        where: { title: pkg.title },
        create: {
          ...pkg,
          gameId: games[index % games.length].id
        },
        update: {
          priceTHB: pkg.priceTHB,
          coinAmount: pkg.coinAmount
        }
      })
    )
  );

  console.log(`Seeded ${games.length} games and ${packages.length} packages`);

  const demoOrder = await prisma.order.upsert({
    where: { id: 'demo-order' },
    update: {},
    create: {
      id: 'demo-order',
      userId: admin.id,
      gameId: games[0].id,
      packageId: packages[0].id,
      uid: '997221024',
      paymentMethod: PaymentGateway.PROMPTPAY,
      status: 'Delivered',
      txRef: `GB-${formatISO(new Date())}`
    }
  });

  await prisma.payment.upsert({
    where: { orderId: demoOrder.id },
    update: {},
    create: {
      orderId: demoOrder.id,
      gateway: PaymentGateway.PROMPTPAY,
      status: 'SUCCESS',
      amount: packages[0].priceTHB,
      payload: { note: 'Seed payment' }
    }
  });

  console.log('Demo order seeded');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
