import { router } from "../trpc";
import { authRouter } from "./auth";
import { dataRouter } from "./data";
import { selectedDataRouter } from "./selectedData";


export const appRouter = router({
  auth: authRouter,
  data: dataRouter,
  selectedData: selectedDataRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
