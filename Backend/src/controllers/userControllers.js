const User = require("./../models/userModel");

const getAllID = async (req, res) => {
  const found = await User.find({});
  res.send(found);
};

const getDelete = async (req, res) => {
  const deleted = await User.findByIdAndDelete({ _id: req.params.id });
  res.send(deleted);
};

const getPost = async (req, res) => {
  const newUser = await User(req.body);
  await newUser.save();
  res.send(newUser);
};

module.exports = {
  getAllID,
  getDelete,
  getPost,
};
