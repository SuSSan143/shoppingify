import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const shoppingItemsDataRouter = router({
  getAllData: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.shoppingItemsList.findMany();
  }),
  addItemToShoppingList: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        item: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.shoppingItemsList.update({
        where: {
          name: input.name,
        },
        data: {
          items: {
            push: {
              name: input.item,
              count: 1,
            },
          },
        },
      });
    }),
  doIncrement: publicProcedure
    .input(
      z.object({
        name: z.string(),
        item: z.string(),
        count: z.number(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.shoppingItemsList.update({
        where: {
          name: input.name,
        },
        data: {
          items: {
            updateMany: {
              where: {
                name: input.item,
              },
              data: {
                count: input.count + 1,
              },
            },
          },
        },
      });
    }),
  doDecrement: publicProcedure
    .input(
      z.object({
        name: z.string(),
        item: z.string(),
        count: z.number(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.shoppingItemsList.update({
        where: {
          name: input.name,
        },
        data: {
          items: {
            updateMany: {
              where: {
                name: input.item,
              },
              data: {
                count: input.count - 1,
              },
            },
          },
        },
      });
    }),
  removeItemFromShoppingList: publicProcedure
    .input(
      z.object({
        name: z.string(),
        items: z.array(z.object({ name: z.string(), count: z.number() })),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.shoppingItemsList.update({
        where: {
          name: input.name,
        },
        data: {
          items: input.items,
        },
      });
    }),
});
