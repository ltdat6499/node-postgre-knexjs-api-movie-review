const fs = require("fs");

module.exports = async (ctx) => {
  try {
    if (fs.existsSync(__dirname + "/../output.csv")) {
      ctx.body = fs.createReadStream(__dirname + "/../output.csv");
      ctx.attachment(__dirname + "/../output.csv");
    } else {
      ctx.throw(400, "Requested file not found on server");
    }
  } catch (error) {
    ctx.throw(500, error);
  }
};
