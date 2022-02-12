const User = require("../model/User");

const storeUser = async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone)
      return res
        .status(401)
        .json({ message: "User phone Number Not provided" });

    const user = await User.findOne({ userId: req.userId });

    if (!user) {
      const newUser = new User({ userId: req.userId, phone: phone });
      const savedUser = await newUser.save();
      return res.status(200).json(savedUser);
    }

    return res.status(200).json(user);
  } catch (error) {
    console.log("user controller, storeUser\n", error);
    return res.status(500).json({ message: "Server error", error: error });
  }
};

/** Update a specific user */
const updateUser = async (req, res) => {
  try {
    const { fullName, email, phone, bloodType, location, address } = req.body;

    if (!fullName || !email || !phone || !bloodType || !location || !address)
      return res.status(401).json({ message: "Required data missing" });

    const updateUser = await User.findOneAndUpdate(
      { userId: req.userId },
      {
        fullName: fullName,
        email: email,
        phone: phone,
        bloodType: bloodType.toUpperCase(),
        location: location,
        address: address,
      },
      { new: true }
    );

    return res.status(200).json({ updateUser });
  } catch (error) {
    console.log("user controller, updateUser\n", error);
    return res.status(500).json({ message: "Server Error", error: error });
  }
};

/** Delete a specific user */
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete({ userId: req.userId });
    return res.status(200).json({ message: "User deleted" });
  } catch (error) {
    console.log("user controller, deleteUser\n", error);
    return res.status(500).json({ message: "Server error" });
  }
};

/** Update the lastDonationDate of a user to current date*/
const updateUserLastDonationDate = async (req, res) => {
  try {
    const date = new Date();
    const updatedUser = await User.findOneAndUpdate(
      { userId: req.userId },
      { lastDonationDate: date },
      { new: true }
    );

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log("user controller, updateUserLastDonateDonate\n", error);
    return res.status(500).json({ message: "Server Error", error: error });
  }
};

/** Find list of nearby users within the range */
const findUsers = async (req, res) => {};

module.exports = {
  storeUser,
  updateUser,
  deleteUser,
  updateUserLastDonationDate,
  findUsers,
};
