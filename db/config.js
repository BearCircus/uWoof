module.exports = {
  dbUser: process.env.DB_USER,
  dbpassword: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
  getUrl: function () {
    return `mongodb+srv://${this.dbUser}:${this.dbpassword}@cluster0.yerl9.mongodb.net/${this.dbName}?retryWrites=true&w=majority`;
  },
};
