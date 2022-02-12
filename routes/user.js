const express = require("express");

const authMiddleWare = require("../middleware/auth");

const { updateUser, deleteUser, getUser } = require("../controller/user");

const router = express.Router();

router.get("/", (req, res) => res.status(200).send("User Route"));

router.get("/verify", authMiddleWare, (req, res) => {
  res.send("User Verified");
});

// router.put("/:id", authMiddleWare, updateUser);
// router.delete("/:id", authMiddleWare, deleteUser);
// router.get("/find/:id", authMiddleWare, getUser);

module.exports = router;
