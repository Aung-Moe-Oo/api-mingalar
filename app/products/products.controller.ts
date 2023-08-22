import { Request, Response } from "express";
import Product from "./products.service";
import multer from "multer";

export const fetchAllProducts = (req: Request, res: Response) => {
  const product = new Product();

  product
    .get()
    .then((productList) => {
      res.status(200).json({
        meta: {
          success: true,
          message: "success",
        },
        body: productList,
      });
    })
    .catch((err) => {
      res.status(500).json({
        meta: {
          success: false,
          message: "internal server error",
        },
        body: err,
      });
    });
};

export const fetchProductById = (req: Request, res: Response) => {
  const product = new Product();
  const id = req.params.id;

  product
    .getById(id)
    .then((product) => {
      res.status(200).json({
        meta: {
          success: true,
          message: "success",
        },
        body: product,
      });
    })
    .catch((err) => {
      res.status(500).json({
        meta: {
          success: false,
          message: "internal server error",
        },
        body: err,
      });
    });
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/");
  },
  filename: function (req, file, cb) {
    const filename = file.originalname;
    cb(null, filename);
  },
});
const upload = multer({ storage: storage });

export const createProduct = (req: Request, res: Response) => {
  try {
    upload.any()(req, res, async (err: any) => {
      if (err) {
        throw err;
      }

      if (req.files) {
        let blob;
        // Check if files is an array or object
        if (Array.isArray(req.files)) {
          blob = req.files[0];
        } else {
          blob = req.files[Object.keys(req.files)[0]][0];
        }

        const product = new Product();

        const filename = blob.originalname;

        const { name, detail, type, price, userId } = req.body;

        product
          .create({
            name: name,
            detail: detail,
            price: parseFloat(price),
            type: type,
            createdBy: {
              connect: {
                id: userId,
              },
            },
            Image: {
              create: {
                name: filename,
                path:
                  process.env.NODE_ENV === "development"
                    ? `${req.protocol}://${req.hostname}:8000/uploads/${filename}`
                    : `${req.protocol}://${req.hostname}/uploads/${filename}`,
              },
            },
          })
          .then((newproduct) => {
            res.status(200).json({
              meta: {
                success: true,
                message: "success",
              },
              body: newproduct,
            });
          })
          .catch((err) => {
            res.status(500).json({
              meta: {
                success: false,
                message: "internal server error",
              },
              body: err,
            });
          });
      }
    });
  } catch (err) {
    console.error(err);
    return res.json({
      meta: {
        success: false,
        message: "internal-server-error",
        devMessage: "",
      },
    });
  }
};

export const updateProduct = (req: Request, res: Response) => {
  const product = new Product();
  const id = req.params.id;
  const { name, detail, type, price, userId } = req.body;
  try {
    upload.any()(req, res, async (err: any) => {
      if (err) {
        throw err;
      }
      if (req.files) {
        let blob;
        // Check if files is an array or object
        if (Array.isArray(req.files)) {
          blob = req.files[0];
        } else {
          blob = req.files[Object.keys(req.files)[0]][0];
        }

        const filename = blob.originalname;

        product
          .update(id, {
            name: name,
            detail: detail,
            price: parseFloat(price),
            type: type,
            createdBy: {
              connect: {
                id: userId,
              },
            },
            Image: {
              create: {
                name: filename,
                path:
                  process.env.NODE_ENV === "development"
                    ? `${req.protocol}://${req.hostname}:8000/uploads/${filename}`
                    : `${req.protocol}://${req.hostname}/uploads/${filename}`,
              },
            },
          })
          .then((newproduct) => {
            res.status(200).json({
              meta: {
                success: true,
                message: "success",
              },
              body: newproduct,
            });
          })
          .catch((err) => {
            res.status(500).json({
              meta: {
                success: false,
                message: "internal server error",
              },
              body: err,
            });
          });
      } else {
        product
          .update(id, {
            name: name,
            detail: detail,
            price: parseFloat(price),
            type: type,
            createdBy: {
              connect: {
                id: userId,
              },
            },
          })
          .then((newproduct) => {
            res.status(200).json({
              meta: {
                success: true,
                message: "success",
              },
              body: newproduct,
            });
          })
          .catch((err) => {
            res.status(500).json({
              meta: {
                success: false,
                message: "internal server error",
              },
              body: err,
            });
          });
      }
    });
  } catch (err) {
    console.error(err);
    return res.json({
      meta: {
        success: false,
        message: "internal-server-error",
        devMessage: "",
      },
    });
  }
};

export const deleteProduct = (req: Request, res: Response) => {
  const product = new Product();
  const id = req.params.id;
  product
    .delete(id)
    .then((deleteProduct) => {
      res.status(200).json({
        meta: {
          success: true,
          message: "success",
        },
        body: deleteProduct,
      });
    })
    .catch((err) => {
      res.status(500).json({
        meta: {
          success: false,
          message: "internal server error",
        },
        body: err,
      });
    });
};
