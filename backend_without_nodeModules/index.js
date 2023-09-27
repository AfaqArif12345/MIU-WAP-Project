const express = require("express");
const productRouter = require("./routes/productRouter");
const userRouter = require("./routes/usersRouter");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 3001;

app.use("/users", userRouter);
app.use("/products", productRouter);

app.listen(port, () => {
  console.log(`listening at port ${port}`);
});
