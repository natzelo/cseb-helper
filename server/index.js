const express = require("express");
const cors = require("cors");
require("./db/mongoose");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

const PORT = process.env.PORT || 5000;

const userRouter = require("./routers/user");
const householdRouter = require("./routers/household");

app.use("/api", userRouter);
app.use("/api", householdRouter);

app.listen(PORT, () => {
  console.log(`"Listening on port ${PORT}`);
});
