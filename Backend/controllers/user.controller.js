const User = require("../models/user.model");
const {createUser} = require("../services/user.service");
const {validationResult} = require("express-validator");

module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }

  try {
    const { fullname, email, password } = req.body;
    const hashedPassword = await User.hashPassword(password);

    const user = await createUser({
      firstName: fullname.firstName,
      lastName: fullname.lastName,
      email,
      password: hashedPassword,
    });

    if(!user) {
      return res.status(400).json({message: "Could not create user"});
    }

    const token = user.generateAuthToken();

    return res.status(201).json({token, user})

  } catch (error) {
    return res.status(500).json({message: error.message});
  }

}