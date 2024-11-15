const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");

const DB = process.env.MONGO_DB_URI;
mongoose.connect(DB).then(() => {
  console.log("DB is connected succesfully.");
});

const PORT = 5000 || process.env.PORT;
app.listen(PORT, () => {
  console.log(`App is listening on port: ${PORT}.`);
});
