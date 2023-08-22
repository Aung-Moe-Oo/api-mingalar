import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  fetchAllProducts,
  fetchProductById,
  updateProduct,
} from "./products.controller";
import VerifyToken from "../middware/verifyToken";

const productRouter = Router();

productRouter.get("/", VerifyToken, fetchAllProducts);
productRouter.get("/:id", fetchProductById);
productRouter.post("/", VerifyToken, createProduct);
productRouter.patch("/:id", VerifyToken, updateProduct);
productRouter.delete("/:id", VerifyToken, deleteProduct);

export default productRouter;
