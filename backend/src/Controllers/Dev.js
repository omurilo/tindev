const axios = require("axios");
const Dev = require("../Models/Dev");

module.exports = {
  async index(req, res) {
    const { user } = req.headers;

    const loggedDev = await Dev.findById(user);

    const listDevs = await Dev.find({
      $and: [
        { _id: { $ne: user } },
        { _id: { $nin: loggedDev.likes } },
        { _id: { $nin: loggedDev.dislikes } }
      ]
    });

    return res.json(listDevs);
  },

  async store(req, res) {
    try {
      const { username: user } = req.body;

      const userExists = await Dev.findOne({ user });

      if (userExists) {
        return res.json(userExists);
      }

      const { data } = await axios.get(`https://api.github.com/users/${user}`);

      const { name, bio, avatar_url: avatar } = data;

      const dev = await Dev.create({
        name,
        bio,
        user,
        avatar
      });

      return res.json(dev);
    } catch (error) {
      res.status(400).json({
        error: "User not exists!"
      });
    }
  }
};
