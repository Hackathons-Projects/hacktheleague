const User = require("../model/User");

const storeUser = async (req, res) => {
  try {
    const phone = req.body.identifier;

    if (!phone)
      return res
        .status(401)
        .json({ message: "User phone Number Not provided" });

    const user = await User.findOne({ userId: req.body.user_id });

    if (!user) {
      const newUser = new User({ userId: req.body.user_id, phone: phone });
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
      { userId: req.body.userId },
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
const findUsers = async (req, res) => {
  try {
    const { lat, lon, range } = req.query;

    if (!lat || !lon || !range)
      return res
        .status(401)
        .json({ message: "Query data not in corrent format" });

    const deg2rad = (deg) => {
      return deg * (Math.PI / 180);
    };

    const getDistance = (lat1, lon1, lat2, lon2) => {
      var R = 6371; // Radius of the earth in km
      var dLat = deg2rad(lat2 - lat1); // deg2rad below
      var dLon = deg2rad(lon2 - lon1);
      var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) *
          Math.cos(deg2rad(lat2)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c; // Distance in km
      return d;
    };

    const comparator = (a, b) => {
      const dist1 = getDistance(lat, lon, a.lat, a.lon);
      const dist2 = getDistance(lat, lon, b.lat, b.lon);
      if (dist1 < dist2) return -1;
      if (dist1 > dist2) return 1;
      return 0;
    };

    const users = await User.find();

    const allUsers = users.filter((element) => {
      const dist = getDistance(
        lat,
        lon,
        element.location.latitude,
        element.location.longitude
      );

      if (dist > range) return false;
      else return true;
    });

    allUsers.sort(comparator);
    res.status(200).json(allUsers);
  } catch (error) {
    console.log("user controller getUser", error);
    return res.status(500).json({ message: "Server error", error: error });
  }
};

module.exports = {
  storeUser,
  updateUser,
  deleteUser,
  updateUserLastDonationDate,
  findUsers,
};
