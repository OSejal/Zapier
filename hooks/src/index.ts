import express from "express";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();
const app = express();

app.use(express.json());

app.post("/hooks/catch/:userId/:zapId", async (req, res) => {
  try {
    const zapId = req.params.zapId;   
    const body = req.body;

    await client.$transaction(async (tx) => {
      const run = await tx.zapRun.create({
        data: {
          zapId: zapId,
          metadata: body,
        },
      });

      await tx.zapRunOutbox.create({
        data: {
          zapRunId: run.id,
        },
      });
    });

    res.json({
      message: "Webhook received successfully",
    });
  } catch (err) {
    console.error("Error handling webhook:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
