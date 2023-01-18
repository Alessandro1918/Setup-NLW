import Fastify from "fastify";
import cors from "@fastify/cors"
import { PrismaClient } from "@prisma/client";

const PORT = 4000
const app = Fastify()
const prisma = new PrismaClient()

app.register(cors)

app.get("/habits", async () => {
  const habits = await prisma.habit.findMany()
  return habits
})

app
  .listen({port: PORT})
  .then(() => {console.log(`Server running on port ${PORT}`)})