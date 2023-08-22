import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { log } from "console";

interface AuthRequest extends Request {
  user?: any;
}

const VerifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const secret = process.env.JWT_SECRET;
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader?.split(" ")[1];
    jwt.verify(token, secret!, (err, user: any) => {
      if (err) {
        res.status(401).json({
          meta: {
            success: false,
            message: "invalid-token",
          },
        });
      }
      req.user = {
        id: user.data.id,
      };

      console.log("====================================");
      console.log(req.user);
      console.log("====================================");
      next();
    });
  } else {
    res.status(401).json({
      meta: {
        success: false,
        message: "invalid-token",
      },
    });
  }
};

export default VerifyToken;
