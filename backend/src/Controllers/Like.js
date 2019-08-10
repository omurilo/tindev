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

    const itsAMatch = targetDev.likes.includes(loggedDev._id);

    if (itsAMatch) {
      const loggedSocket = req.listConnecteds[user];
      const targetSocket = req.listConnecteds[devId];

      if (loggedSocket) {
        req.io.to(loggedSocket).emit("match", targetDev);
      }

      if (targetSocket) {
        req.io.to(targetSocket).emit("match", loggedDev);
      }
    }

    loggedDev.likes.push(targetDev._id);

    await loggedDev.save();

    return res.json(loggedDev);
  }
};
