import "./setup";
import express from "express";
import cors from "cors";

import * as songController from "./controllers/songController";
import * as voteController from "./controllers/voteController";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/test", (req, res) => {
  res.send("OK!");
});

app.post("/recommendations", songController.add);
app.post("/recommendations/:id/upvote", voteController.add);
app.post("/recommendations/:id/downvote", voteController.remove);

export default app;
