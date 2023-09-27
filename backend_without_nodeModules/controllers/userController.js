const constants = require("../constants");
const users = constants.users;

exports.getALL = (req, res) => {
  res.json(users);
  res.end();
};

exports.login = (req, res) => {
  let finduser = users.findIndex((user) => user.username == req.body.username);
  //   console.log(finduser);
  if (finduser > -1 && users[finduser].password == req.body.password) {
    res.json({
      auth: new Date().getTime() + `_${users[finduser].username}`,
      user: users[finduser].username,
      cart: users[finduser].cart,
    });
    res.end();
  } else {
    res.status(404).send("could not find user");
    res.end();
  }
};

module.exports = exports;
