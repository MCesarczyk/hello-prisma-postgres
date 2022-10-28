import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const fetchAllUsers = async () => {
  const allUsers = await prisma.user.findMany();
  console.log(allUsers);
};

async function main() {
  fetchAllUsers();
};

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  });