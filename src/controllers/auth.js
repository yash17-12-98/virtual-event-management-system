const bcrypt = require("bcrypt");
const Validator = require("../helpers/validators");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const userRequest = req.body;

    if (!Validator.validateAuthUserInfo(userRequest).status) {
      return res.status(400).send(Validator.validateAuthUserInfo.message);
    }

    const authUser = await User.findOne({ email: userRequest.email });

    if (!authUser) {
      return res
        .status(404)
        .json({ staus: "error", message: "User not found" });
    }

    let isPasswordValid = bcrypt.compareSync(
      userRequest.password,
      authUser.password
    );

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ status: "error", message: "Invalid password" });
    }

    let token = jwt.sign({ id: authUser.id }, process.env.API_SECRET, {
      expiresIn: 86400,
    });

    return res.status(200).json({
      staus: "success",
      message: "User login successsfully",
      accesstoken: token,
      data: { id: authUser.id, name: authUser.name, role: authUser.role },
    });
  } catch (err) {
    return res
      .status(500)
      .json({ status: "error", message: err || "Internel server error" });
  }
};

const register = async (req, res) => {
  try {
    const userRequest = req.body;

    console.log("User request:", userRequest);

    if (Validator.validateRegisterUserInfo(userRequest).status === false) {
      return res.status(400).send(Validator.validateRegisterUserInfo.message);
    }

    const newUser = new User({
      name: userRequest.name,
      email: userRequest.email,
      password: bcrypt.hashSync(userRequest.password, 8),
      role: userRequest.role,
    });

    const saveUser = await newUser.save();

    return res.status(200).json({
      status: "success",
      message: "User created successfully",
      data: { id: saveUser.id, name: saveUser.name, role: saveUser.role },
    });
  } catch (err) {
    return res
      .status(500)
      .json({ status: "error", message: err || "Internel server error" });
  }
};

module.exports = { login, register };
