import express, { Router } from "express";

// routes
import userRouter from "./users/users.route";

import productRouter from "./products/products.route";

const appRouter = Router();

appRouter.get("/", (req, res) => {
  res.send("Hello World.");
});

appRouter.use("/api/products", productRouter);
appRouter.use("/api/auth", userRouter);

appRouter.use("/uploads", express.static(`${__dirname}/public/uploads`));

export default appRouter;
