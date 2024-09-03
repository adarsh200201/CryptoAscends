const express = require("express");
const router = express.Router();
const User = require("../models/User"); // User model
const Profile = require("../models/Profile"); // Profile model
const Wallet = require("../models/Wallet"); // Wallet model
const { body, validationResult } = require("express-validator");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret = "abcdefghijklmnopqrstuvwxyz";

// Route to handle user creation
router.post(
  "/creatuser",
  [
    body("email", "Invalid email").isEmail(),
    body("password", "Password too short").isLength({ min: 5 }),
    body("first_name", "First name is required").notEmpty(),
    body("last_name", "Last name is required").notEmpty(),
    body("age", "Age is required").isNumeric(),
    body("mob", "Mobile number is required").notEmpty(),
  ],
  async (req, res) => {
    try {
      // Validate request
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Check if user already exists
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        return res.status(400).json({ success: false, userexist: true });
      }

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      // Create a new user
      const newUser = await User.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        age: req.body.age,
        mob: req.body.mob,
        email: req.body.email,
        password: hashedPassword,
      });

      // Create wallet and profile for the new user
      await Wallet.create({
        UserId: newUser._id,
        Amount: 100000,
        Invested: 0,
      });

      await Profile.create({
        userId: newUser._id,
        url: "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=2048x2048&w=is&k=20&c=6hQNACQQjktni8CxSS_QSPqJv2tycskYmpFGzxv3FNs=",
      });

      // Generate JWT token
      const payload = { user: { id: newUser._id } };
      const authToken = jwt.sign(payload, jwtSecret, { expiresIn: '1h' });

      // Send response
      res.json({ success: true, userexist: false, authToken: authToken });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  }
);

module.exports = router;
