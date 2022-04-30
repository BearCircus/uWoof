module.exports = {
  dbUser: "uWoofAdminGeneral",
  dbpassword: "anxkC2SPVu3EpAhZ",
  dbName: "myFirstDatabase",
  getUrl: function () {
    return `mongodb+srv://${this.dbUser}:${this.dbpassword}@cluster0.yerl9.mongodb.net/${this.dbName}?retryWrites=true&w=majority`;
  },
};
