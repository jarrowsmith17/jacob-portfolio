import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';

// 1. Setup the connection to Supabase using the Postgres driver
const connectionString = process.env.DATABASE_URL;

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding started...");

  // --- CONFIGURATION ---
  // CHANGE THIS STRING to set your new password
  const MY_SECRET_PASSWORD = 'Derby1884'; 
  // ---------------------

  // 2. Hash the password before storing it
  const passwordHash = await bcrypt.hash(MY_SECRET_PASSWORD, 10);

  // 3. Create or Update the Admin User
  const user = await prisma.user.upsert({
    where: { username: 'admin' },
    
    // If the user ALREADY exists, update their password
    update: {
      password: passwordHash,
    },
    
    // If the user DOES NOT exist, create them
    create: {
      username: 'admin',
      password: passwordHash,
    },
  });

  console.log("-----------------------------------");
  console.log("Admin user configured successfully.");
  console.log("Username: admin");
  console.log("Status:   Password updated");
  console.log("-----------------------------------");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });