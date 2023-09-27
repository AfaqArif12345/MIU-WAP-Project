const constatnts = require("../constants");
const inintialProducts = constatnts.products;
const orders = [];

exports.test = (req, res) => {
  // console.log("body", req.body);
  res.send("hello world");
  res.end();
};

exports.getAllProducts = (req, res) => {
  // console.log("body ", req.body);
  if (req.body.Auth && req.body.Auth != "") {
    res.json(inintialProducts);
    res.end();
  } else {
    res.status(401);
    res.send("You are not authorized. \nplease login");
  }
};

exports.placeOrder = (req, res) => {
  if (req.body.Auth && req.body.Auth != "") {
    // console.log(req.body);
    editProducts(req.body.order);
    res.json(inintialProducts);
    res.end();
  } else {
    res.status(401);
    res.send("You are not authorized. \nplease login");
  }
};

function editProducts(order) {
  // console.log(inintialProducts);
  order.map((orderItem) => {
    let productIndex = inintialProducts.findIndex(
      (item) => item.name == orderItem.name
    );
    inintialProducts[productIndex].stock -= parseInt(orderItem.quantity);
    // console.log(inintialProducts[productIndex]);
  });
  orders.push(order);
  // return inintialProducts;
}
module.exports = exports;
