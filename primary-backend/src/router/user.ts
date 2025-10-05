import { Router } from "express";
import { authMiddleware } from "../middleware";
import { SigninSchema, SignupSchema } from "../types";
import { prismaClient } from "../db";
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "../config";
import { email } from "zod";
const router = Router();

router.post("/signup", async (req, res) => {
    const body = req.body.username;
    const parserData = SignupSchema.safeParse(body);

    if(!parserData.success) {
        return res.status(411).json({
            message: "Incorrect Inputs"
        })
    }

    const userExists = await prismaClient.user.findFirst({
        where: {
            email: parserData.data.username
        }
    });

    if(userExists) {
        return res.status(403).json({
            message: "User already exists"
        })
    }

    await prismaClient.user.create({
        data: {
            email: parserData.data.username,
            password: parserData.data.password,
            name: parserData.data.name

        }
    })

    return res.json({
        message: "Please verify your account by checking your email"
    });
})

router.post("/signin", async (req, res) => {
    const body = req.body.username;
    const parserData = SigninSchema.safeParse(body);

    if(!parserData.success) {
        return res.status(411).json({
            message: "Incorrect Inputs"
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