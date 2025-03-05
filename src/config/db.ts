import mongoose from "mongoose";

const connectToDb = mongoose
  .connect("mongodb://localhost:27017/mindseed")
  .then((connection) => {
    console.log("successfully connected to db");
  });

export default connectToDb;
