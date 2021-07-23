import "./setup";
import express from "express";
import cors from "cors";

import * as songController from "./controllers/songController";
import * as voteController from "./controllers/voteController";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/recommendations", songController.add);
app.post("/recommendations/:id/upvote", voteController.add);
app.post("/recommendations/:id/downvote", voteController.remove);
app.get("/recommendations/random", songController.getRandom);
app.get("/recommendations/top/:amount", )

export default app;
