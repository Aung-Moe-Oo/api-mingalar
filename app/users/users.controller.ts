import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import JWT from "jsonwebtoken";
import User from "./users.service";
import bcrypt from "bcrypt";

export const register = async (req: Request, res: Response) => {
  const user = new User();
  try {
    const { name, email, password } = req.body;
    const salt = parseInt(process.env.SALT_PASS || "10");
    const hashedPw = await bcrypt.hash(password, salt);

    if (name !== undefined && email !== undefined && password !== undefined) {
      const createdUser = await user.createNewUser({
        name,
        email,
        password: hashedPw,
      });
      return res.json({
        meta: {
          success: true,
          message: "success",
          devMessage: createdUser,
        },
      });
    } else {
      return res.json({
        meta: {
          success: false,
          message: "fields-required",
          devMessage: "fields-required",
        },
      });
    }
  } catch (err) {
    return res.json({
      meta: {
        success: false,
        message: "internal-server-error",
        devMessage: err,
      },
    });
  }
};

export const login = async (req: Request, res: Response) => {
  const { user } = new PrismaClient();
  try {
    const { password, email } = req.body;
    if (password !== undefined && email !== undefined) {
      const existingUser = await user.findUnique({
        where: {
          email: email,
        },
      });
      if (existingUser) {
        const checkPassword = bcrypt.compareSync(
          password,
          existingUser.password || "1212"
        );
        if (checkPassword) {
          const token = JWT.sign(
            {
              data: existingUser,
            },
            process.env.JWT_SECRET || "",
            { expiresIn: "1d" }
          );
          return res.json({
            meta: {
              success: true,
              message: "success",
              devMessage: "user-login",
            },
            body: {
              token,
              user: {
                id: existingUser.id,
                name: existingUser.name,
                email: existingUser.email,
              },
            },
          });
        } else {
          return res.json({
            meta: {
              success: false,
              message: "wrong password",
              devMessage: "user-login-failed",
            },
            body: "",
          });
        }
      } else {
        return res.json({
          meta: {
            success: false,
            message: "user not exist!",
            devMessage: "",
          },
        });
      }
    } else {
      return res.json({
        meta: {
          success: false,
          message: "fields-required",
          devMessage: "",
        },
      });
    }
  } catch (err) {
    return res.json({
      meta: {
        success: false,
        message: "internal-server-error",
        devMessage: err,
      },
    });
  }
};
