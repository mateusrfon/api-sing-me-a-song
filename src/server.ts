import app from "./app";

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}.`);
});
