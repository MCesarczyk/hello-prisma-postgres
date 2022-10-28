import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface IUser {
  name: string;
  email: string;
};

interface IUserWithDetails extends IUser {
  posts: {
    create: {
      title: string;
    },
  },
  profile: {
    create: {
      bio: string;
    },
  },
};

const fetchAllUsers = async () => {
  const allUsers = await prisma.user.findMany();
  console.log(allUsers);
};

const addUserWithDetails = async (user: IUserWithDetails) => {
  await prisma.user.create({ data: user })

  const allUsers = await prisma.user.findMany({
    include: {
      posts: true,
      profile: true,
    },
  })
  console.dir(allUsers, { depth: null })
}

async function main() {
  // fetchAllUsers();

  addUserWithDetails({
    name: 'Alice',
    email: 'alice@prisma.io',
    posts: {
      create: { title: 'Hello World' },
    },
    profile: {
      create: { bio: 'I like turtles' },
    },
  });
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