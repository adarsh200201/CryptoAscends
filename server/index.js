const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// Update the CORS configuration to allow requests from localhost:3002
app.use(
  cors({
    origin: [ "http://localhost:5000"], // Add your local origin here
    credentials: true,
  })
);

const Connection_url = "mongodb+srv://AdarshSharma_07:SITADEVI%40123456@cluster0.igthiyr.mongodb.net/CryptoBeaconX";
const PORT = 5000;

mongoose
  .connect(Connection_url)
  .then(() => {
    console.log("Connected to MongoDB database");
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  })
  .catch((error) => console.log(error.message));

mongoose.set("strictQuery", true);



// Here are routes for backend calls

app.use("/dashboard", require("./Routes/Dashboard"));
app.use("/dashboard", require("./Routes/Userdetails"));
app.use("/dashboard", require("./Routes/ProfileUpdate"));
app.use("/register", require("./Routes/CreatUser"));
app.use("/register", require("./Routes/Signup"));
app.use("/transactions", require("./Routes/Transactions"));
app.use("/wallet", require("./Routes/Wallet"));

// Add this route to display a message on visiting the root URL
app.get('/', (req, res) => {
  res.send("Your website is running on this port");
});


