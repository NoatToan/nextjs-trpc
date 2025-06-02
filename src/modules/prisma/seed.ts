const prisma = new PrismaClient();

export async function main() {
  for (const u of userData) {
    await prisma.user.create({ data: u });
  }
}

main();
