const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
module.exports = {
  create,
  login,
  checkToken,
  userLog,
};

function checkToken(req, res) {
  // req.user will always be there for you when a token is sent
  console.log("req.user", req.user);
  res.json(req.exp);
}

function createJWT(user) {
  console.log("Creating JWT");
  return jwt.sign(
    // data payload
    { user },
    process.env.SECRET,
    { expiresIn: "24h" }
  );
}

async function create(req, res) {
  try {
    let user = await User.create(req.body);
    let token = createJWT(user);
    res.json(token);
    console.log(`User : ${req.body}, Token: ${token}`);
  } catch (error) {
    res.status(400).json(error);
  }
}

async function login(req, res, next) {
  try {
    let user = await User.findOne({ email: req.body.email });
    console.log(`Current User : ${user}`);
    console.log(
      `Comparing : ${req.body.password} and also.... ${user.password}`
    );
    if (!user) throw new Error();
    let match = await bcrypt.compare(req.body.password, user.password);
    console.log(`MATCH FOUND: ${match}`);
    if (!match) throw new Error();
    res.json(createJWT(user));
    next();
  } catch (error) {
    console.log("ERROR:", error);
    res.status(400).json("Bad Credentials");
  }
}

async function userLog(req, res) {
  try {
    const userId = req.body.id;
    const userLog = {
      name: req.body.name,
      createdAt: Date.now(),
      activity: req.body.activity,
    };

    // Check if the user exists
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user data
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $push: { logs: userLog },
      },
      {
        new: true,
      }
    );

    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user logs:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
