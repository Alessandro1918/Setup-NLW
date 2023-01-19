import Fastify from "fastify";
import cors from "@fastify/cors"
import { appRoutes } from "./routes";

const PORT = 4000

const app = Fastify()

app.register(cors)
app.register(appRoutes)

app
  .listen({port: PORT})
  .then(() => {console.log(`Server running on port ${PORT}`)})