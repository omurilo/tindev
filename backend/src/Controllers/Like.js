const Dev = require("../Models/Dev");

module.exports = {
  async store(req, res) {
    const { devId } = req.params;
    const { user } = req.headers;

    const loggedDev = await Dev.findById(user);
    const targetDev = await Dev.findById(devId);

    if (!targetDev) {
      return res
        .status(400)
        .json({ error: "Target user of action not exists!" });
    }

    loggedDev.likes.push(targetDev._id);

    await loggedDev.save();

    const itsAMatch = targetDev.likes.includes(user);

    if (itsAMatch) {
      const loggedSocket = req.listConnecteds[user];
      const targetSocket = req.listConnecteds[devId];

      if (loggedSocket) {
        req.io.to(loggedDev).emit("match", targetDev);
      }

      if (targetSocket) {
        req.io.to(targetDev).emit("match", loggedDev);
      }
    }

    return res.json(loggedDev);
  }
};
