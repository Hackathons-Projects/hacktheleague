const express = require("express");
const User = require("../model/User");
const authMiddleWare = require("../middleware/auth");

const { updateUser, deleteUser, getUser } = require("../controller/user");

const router = express.Router();

router.get("/", (req, res) =>{

});
router.post("/add", (req, res) => {
    User.findOne({
        userId: req.body.identifier
    },function(err, user){
        if(err){
            res.send(JSON.stringify({msg: "Authentication Failed"}))
        }
        if(!user){
            res.send(JSON.stringify({msg: "new"}));
        }
        else{
            res.send(JSON.stringify({msg: "existing"}))
        }
    })
});
router.put("/:id", authMiddleWare, updateUser);
router.delete("/:id", authMiddleWare, deleteUser);
router.get("/find/:id", authMiddleWare, getUser);
router.get("/verify", authMiddleWare, (req, res) => {
  res.send("User Verified");
});


module.exports = router;
