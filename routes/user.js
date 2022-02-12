const express = require("express");
const authMiddleWare = require("../middleware/auth");

const {
  updateUser,
  deleteUser,
  storeUser,
  updateUserLastDonationDate,
  findUsers,
} = require("../controller/user");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("User Route");
});

router.post("/store", authMiddleWare, storeUser);
router.put("/update", authMiddleWare, updateUser);
router.delete("/delete", authMiddleWare, deleteUser);
router.put("/update/lastdonation", authMiddleWare, updateUserLastDonationDate);
router.get("/find", authMiddleWare, findUsers);

module.exports = router;
