import { Router } from "express";
import { authMiddleware } from "../middleware";
import { SigninSchema, SignupSchema } from "../types";
import { prismaClient } from "../db";
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "../config";

const router = Router();

router.post("/signup", async (req, res) => {
  const body = req.body;
  const parserData = SignupSchema.safeParse(body);

  if (!parserData.success) {
    console.log("Validation errors:", parserData.error.issues);
    return res.status(400).json({
        message: "Incorrect Inputs",
        errors: parserData.error.issues
    });
  }

  const userExists = await prismaClient.user.findFirst({
    where: {
      email: parserData.data.username,
    },
  });

  if (userExists) {
    return res.status(403).json({
      message: "User already exists",
    });
  }

  await prismaClient.user.create({
    data: {
      email: parserData.data.username,
      password: parserData.data.password,
      name: parserData.data.name,
    },
  });

  return res.json({
    message: "Please verify your account by checking your email",
  });
});


router.post("/signin", async (req, res) => {
    const body = req.body;  // ← Make sure this is req.body, NOT req.body.username
    const parserData = SigninSchema.safeParse(body);

    if(!parserData.success) {
        console.log("Signin validation failed:", parserData.error.issues);
        return res.status(400).json({
            message: "Incorrect Inputs",
            errors: parserData.error.issues
        })
    }

    const user = await prismaClient.user.findFirst({
        where: {
            email: parserData.data.username,
            password: parserData.data.password
        }
    });

    if(!user) {
        return res.status(403).json({
            message: "Credentials are incorrect"
        })
    }

    const token = jwt.sign({
        id: user.id
    }, JWT_PASSWORD);

    res.json({
        token: token,
    })
})

router.get("/user", authMiddleware, async (req, res) => {
    // @ts-ignore
    const id = req.id;
    const user = await prismaClient.user.findFirst({
       where: {
            id
       },

       select: {
            name: true,
            email: true
       }
    });

    return res.json({
        user
    });
})


export const userRouter = router;