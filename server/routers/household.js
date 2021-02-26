const { Router } = require("express");
const Household = require("../models/household");
const auth = require("../middleware/auth");

const router = new Router();

router.post("/add-household", auth, async (req, res) => {
  try {
    req.body.incharge = req.user._id;
    req.body.roundStatus = false;
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
    const household = await Household.findOne({
      BPNo: req.params.bpNo,
      incharge: req.user._id,
    });
    if (household) {
      res.send(household);
    } else {
      throw new Error("Invalid BP Number or You arenot incharge");
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
});

router.get("/start-a-round", auth, async (req, res) => {
  try {
    await Household.updateMany({ incharge: req.user._id }, { roundStatus: 1 });
    res.send(200);
  } catch (e) {
    console.log(e);
    res.send(500);
  }
});

router.patch("/add-record/:id", auth, async (req, res) => {
  try {
    //check if the record that is being added is not aready done for the round
    const household1 = await Household.findById(req.params.id);
    if (household1.roundStatus === false) {
      throw new Error("Reading already taken for this round");
    }

    //if the record can be added, then push the reading and update roundStatus to false
    const household = await Household.updateOne(
      { _id: req.params.id },
      { $push: { readings: req.body }, roundStatus: false }
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
