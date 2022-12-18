import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const dataRouter = router({
  getAllData: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.data.findMany();
  }),
  getData: publicProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.data.findUnique({
        where: {
          name: input.name,
        },
      });
    }),
  updateData: publicProcedure
    .input(
      z.object({
        name: z.string(),
        item: z.string(),
        desc: z.string(),
        url: z.string(),
        type: z.enum(["add", "edit"]),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.data.update({
        where: {
          name: input.name,
        },
        data: {
          items: {
            ...(input.type === "edit" && {
              updateMany: {
                where: {
                  name: input.item,
                },
                data: {
                  description: input.desc,
                  url: input.url,
                },
              },
            }),
            ...(input.type === "add" && {
              push: {
                name: input.item,
                description: input.desc,
                url: input.url,
              },
            }),
          },
        },
      });
    }),
});
