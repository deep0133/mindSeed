import mongoose from "mongoose";

// "mongodb://localhost:27017/mindseed"
const db_url: string = process.env.MONGO_DB_URL!;

const connectToDb = mongoose.connect(db_url).then((connection) => {
  console.log("successfully connected to db : Host : ");
});

export default connectToDb;
