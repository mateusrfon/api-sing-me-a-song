import "./setup";
import express from "express";
import cors from "cors";

import * as songController from "./controllers/songController";
import * as genreController from "./controllers/genreController";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/recommendations", songController.add);
app.post("/recommendations/:id/upvote", songController.upVote);
app.post("/recommendations/:id/downvote", songController.downVote);
app.get("/recommendations/random", songController.getRandom);
app.get("/recommendations/top/:amount", songController.getTop);

app.post("/genres", genreController.add);

export default app;
