const axios = require("axios");

const verifyToken = async (req, res, next) => {
  try {
    const { token, userid } = req.headers;

    console.log(req.headers);

    if (!token || !userid)
      return res
        .status(401)
        .json({ message: "Authorization token or userId is from headers" });

    const verificationToken = token.split(" ")[1];

    if (!verificationToken)
      return res
        .status(401)
        .json({ message: "Verification Token is missing from headers" });

    const { data } = await axios.post(
      "https://api.sawolabs.com/api/v1/userverify/",
      {
        user_id: userid,
        verification_token: verificationToken,
      }
    );

    if (data.user_valid === true) {
      req.userId = userid;
      next();
    }
  } catch (err) {
    console.log("auth middleware, verifyToken\n", err);

    if (err.response.status === 400)
      return res.status(400).json({ message: "User is not verified" });

    return res.status(500).json({ message: "Server Error", error: err });
  }
};

module.exports = verifyToken;
