import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface IUser {
  name: string;
  email: string;
};

const fetchAllUsers = async () => {
  const allUsers = await prisma.user.findMany();
  console.log(allUsers);
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

const addUserWithDetails = async (user: IUserWithDetails) => {
  await prisma.user.create({ data: user })

  const allUsers = await prisma.user.findMany({
    include: {
      posts: true,
      profile: true,
    },
  })
  console.dir(allUsers, { depth: null })
};

const updatePost = async (id: number, published: boolean) => {
  const post = await prisma.post.update({
    where: { id: id },
    data: { published: published },
  });

  console.log(post);
};

async function main() {
  // fetchAllUsers();

  // addUserWithDetails({
  //   name: 'Alice',
  //   email: 'alice@prisma.io',
  //   posts: {
  //     create: { title: 'Hello World' },
  //   },
  //   profile: {
  //     create: { bio: 'I like turtles' },
  //   },
  // });

  updatePost(1, true);
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