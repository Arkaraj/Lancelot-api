import { connect } from "mongoose";

export const connection = async () => {
  connect(
    `${process.env.MONGO_URI}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    },
    (err) => {
      if (err) {
        console.log("Error in Connection with MongoDB, Reason: " + err.message);
      } else {
        console.log("Successfully Connected to Database!");
      }
    }
  );
};
