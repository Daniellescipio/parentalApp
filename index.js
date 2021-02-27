const express = require("express");
const app = express();
require('dotenv').config()
const morgan = require("morgan");
const mongoose = require("mongoose");
const expressJwt = require('express-jwt')

app.use(morgan("dev"));
app.use(express.json());

mongoose.connect(
  "mongodb://localhost:27017/parental",
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  () => console.log("connected to the DB")
);
app.use("/auth", require("./routes/authRouter"))
app.use('/parental', expressJwt({secret:process.env.SECRET, algorithms: ['HS256']}))
app.use("/parental/topics", require("./routes/topicRouter"))
app.use("/parental/posts", require("./routes/postRouter"))
app.use("/parental/users", require("./routes/userRouter"))
app.use("/parental/questions", require("./routes/questionRouter"))
app.use("/parental/responses", require("./routes/responseRouter"))



app.use((err, req, res, next)=>{
    console.log(err)
    return res.send({errMessage: err.message})
})

app.listen(7000, () => {
  console.log("connected to the server");
});
