exports.users = [
  {
    id: 1,
    username: "user1",
    password: "password1",
    cart: {},
  },
  {
    id: 2,
    username: "user2",
    password: "password2",
    cart: {},
  },
];

exports.products = [
  {
    id: 1,
    name: "Node.js",
    price: 9.99,
    stock: 8,
    imgSrc: `${__dirname}/images/node.png`,
  },
  {
    id: 2,
    name: "React",
    price: 19.99,
    stock: 5,
    imgSrc: `${__dirname}/images/react.jpg`,
  },
  {
    id: 3,
    name: "Angular.js",
    price: 29.99,
    stock: 13,
    imgSrc: `${__dirname}/images/angular.png`,
  },
  {
    id: 4,
    name: "Angulars.js",
    price: 25.99,
    stock: 1,
    imgSrc: `${__dirname}/images/angular.png`,
  },
  {
    id: 5,
    name: "444Angulars.js",
    price: 25.99,
    stock: 0,
    imgSrc: `${__dirname}/images/angular.png`,
  },
];

module.exports = exports;
