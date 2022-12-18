import { prisma } from "../src/server/db/client";
import { ObjectId } from "bson";
import { Item, SelectedItem } from "@prisma/client";

async function main() {
  const id = new ObjectId().toString();
  const name = "Meat and Fish";
  const items: Item[] = [];

  await prisma.data.upsert({
    where: {
      id,
    },
    create: {
      name,
      items,
    },
    update: {},
  });
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
