const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/user");
const Jobs = require("../models/jobs");

const { BadRequestError } = require("../errors");
require("dotenv").config();

const register = async (req, res) => {
  const { name, email, mobile, password } = req.body;
  console.log(name, email, mobile, password);
  if (!name || !email || !mobile || !password) {
    throw new BadRequestError("All fields are required");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ error: "Email is already register" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({ name, email, mobile, password: hashedPassword });
  await user.save();

  res.json({ success: true, user: email, name: name });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ error: "invalid email or password" });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.json({ success: true, token, recruiterName: user.name, user: email });
};

const jobPosts = async (req, res) => {
  const {
    companyName,
    logoURL,
    position,
    salary,
    jobType,
    remote,
    location,
    description,
    skills,
    about,
  } = req.body;
  const recruiterName = req.body.name;
  console.log(req.body);
  let skillsArray = skills;
  if (typeof skills === "string") {
    skillsArray = skills.split(",").map((skill) => skill.trim());
  }

  try {
    const jobs = new Jobs({
      companyName,
      logoURL,
      position,
      salary,
      jobType,
      remote,
      location,
      description,
      about,
      skillsRequired: skillsArray,
      recruiterName,
    });

    await jobs.save();
    return res.json({
      message: "Job post created successfully",
      name: recruiterName,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal sever error" });
  }
};

module.exports = { register, login, jobPosts };
