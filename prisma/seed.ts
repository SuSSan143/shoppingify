import { prisma } from "../src/server/db/client";
import { ObjectId } from "bson";
import { type MenuItem, type ShoppingItem } from "@prisma/client";

async function main() {
  const id = new ObjectId().toString();
  const name = "Beverages";
  const items: ShoppingItem[] = [
    {
      name: "Coffee",
      count: 1,
    },
    {
      name: "Tea",
      count: 1,
    },
  ];

  await prisma.shoppingItemsList.upsert({
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
