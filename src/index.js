import express from "express";
import { todoRouter } from "../routers/todo.routes.js";
import { toggleRouter } from "../routers/toggle.routes.js";

process.loadEnvFile();
const app = express();
app.use(express.json())

app.use((req, res, next) => {
  console.log(new Date().toLocaleString(), req.method, req.url);
  next();
});

app.use("/todo",todoRouter)
app.use("/todo",toggleRouter)

app.use((err, req, res, next) => {
  console.log("err", err);
  res.status(500).json({ error: "something went wrong" });
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});