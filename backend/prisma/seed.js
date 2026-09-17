const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("seed123456", 10);

  const user = await prisma.user.upsert({
    where: {
      username: "usuario-seed"
    },
    update: {},
    create: {
      nombre: "Usuario Seed",
      username: "usuario-seed",
      password
    }
  });

  await prisma.task.upsert({
    where: {
      id: 1
    },
    update: {},
    create: {
      id: 1,
      text: "Tarea inicial del seed",
      completed: false,
      userId: user.id
    }
  });

  console.log("Seed ejecutado correctamente");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });