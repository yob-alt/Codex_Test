-- Sample SQL seed for GameBro MVP
INSERT INTO "User" (id, name, email, "passwordHash", "walletBalance", role)
VALUES
  ('seed-user', 'Nok Superspeed', 'player@gamer.gg', '$2a$10$T9j6K4v7R8b6uZoh40q1UeuhVK1Z5UQPXqCFPfeUeawuOa7dBDEuO', 250, 'USER')
ON CONFLICT (email) DO NOTHING;

INSERT INTO "Game" (id, name, "uidLabel", "imageUrl", category)
VALUES
  ('seed-game-ml', 'Mobile Legends: Bang Bang', 'Player ID', 'https://images.unsplash.com/photo-1580121027713-8b987cd5d7a6?auto=format&fit=crop&w=1200&q=80', 'MOBA'),
  ('seed-game-ff', 'Free Fire MAX', 'Player UID', 'https://images.unsplash.com/photo-1606112219348-204d7d8b94ee?auto=format&fit=crop&w=1200&q=80', 'Battle Royale'),
  ('seed-game-gi', 'Genshin Impact', 'Player UID', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80', 'Adventure RPG')
ON CONFLICT (id) DO NOTHING;

INSERT INTO "Package" (id, "gameId", title, "priceTHB", "coinAmount")
VALUES
  ('seed-pkg-1', 'seed-game-ml', 'Weekly Starlight', 129, 250),
  ('seed-pkg-2', 'seed-game-ml', 'Epic Bundle', 249, 550),
  ('seed-pkg-3', 'seed-game-ff', 'Mythic Crystals', 449, 1150),
  ('seed-pkg-4', 'seed-game-gi', 'Starter Diamonds', 35, 60),
  ('seed-pkg-5', 'seed-game-gi', 'Whale Pack', 999, 3000)
ON CONFLICT (id) DO NOTHING;
