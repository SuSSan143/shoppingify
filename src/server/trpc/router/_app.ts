import { router } from "../trpc";
import { authRouter } from "./auth";
import { menuItemDataRouter } from "./menuItemsData";
import { shoppingItemsDataRouter } from "./shoppingListItemsData";


export const appRouter = router({
  auth: authRouter,
  menuItemData: menuItemDataRouter,
  ShpooingListItemData: shoppingItemsDataRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
