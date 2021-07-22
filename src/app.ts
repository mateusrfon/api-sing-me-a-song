import "./setup";
import express from "express";
import cors from "cors";

import * as musicController from "./controllers/musicController";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/test", (req, res) => {
  res.send("OK!");
});

app.post("/recommendations", musicController.add);

export default app;
