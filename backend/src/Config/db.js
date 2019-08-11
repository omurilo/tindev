module.exports = {
  mongodbUrl: `mongodb+srv://${process.env.DB_USER}:${
    process.env.DB_PASS
  }@tindev-metsf.mongodb.net/test?retryWrites=true&w=majority`,
  redisDBUrl: "",
  redisDBPort: ""
};
