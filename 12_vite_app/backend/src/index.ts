import { Hono } from "hono"
import { serve } from "@hono/node-server"
import { cors } from "hono/cors"
import tasksRouter from "./routes/tasks"

const app = new Hono()

app.use("*", cors())

app.route("/tasks", tasksRouter)

const port = Number(process.env.PORT ?? 3000)
const host = process.env.HOST ?? "localhost"

serve({ fetch: app.fetch, port, hostname: host }, (info) => {
  console.log(`Server running at http://${host}:${info.port}`)
})
