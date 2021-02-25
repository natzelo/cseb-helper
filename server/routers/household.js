const { Router } = require("express");
const Household = require("../models/household");
const auth = require("../middleware/auth");

const router = new Router();

router.post("/add-household", auth, async (req, res) => {
  try {
    req.body.incharge = req.user._id;
    const household = new Household(req.body);
    await household.save();
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get("/bp/:bpNo", auth, async (req, res) => {
  try {
    const household = await Household.findOne({ BPNo: req.params.bpNo });
    if (household) {
      res.send(household);
    } else {
      throw new Error("Invalid BP Number");
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
});

router.patch("/add-record/:id", auth, async (req, res) => {
  try {
    const household = await Household.updateOne(
      { _id: req.params.id },
      { $push: { readings: req.body } }
    );

    if (household) {
      res.sendStatus(200);
    } else {
      throw new Error("Could not add record");
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

module.exports = router;
