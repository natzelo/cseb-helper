const express = require("express");
const cors = require("cors");
const path = require("path");
require("./db/mongoose");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, "../client/build")));

const PORT = process.env.PORT || 5500;

const userRouter = require("./routers/user");
const householdRouter = require("./routers/household");

app.use("/api", userRouter);
app.use("/api", householdRouter);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`"Listening on port ${PORT}`);
});
