import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { uploadOnCloudinary } from "../utils/cloudinary.util.js";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
  domain:
    process.env.NODE_ENV === "production" ? process.env.DOMAIN : undefined,
  maxAge: 2592000000,
};

const sentResetPasswordMail = async (email, myToken, id) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.EMAILUSER,
        pass: process.env.EMAILPASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAILUSER,
      to: email,
      subject: "For Reset password",
      html: `
      <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <title>Reset Password</title>
    <style>
      body {
        font-family: 'Arial', sans-serif;
        background-color: #e6f4fb;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 50px auto;
        background-color: white;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 4px 10px rgba(0,0,0,0.1);
      }
      .header {
        background-color: #59168b;
        color: white;
        padding: 20px;
        text-align: center;
      }
      .content {
        padding: 30px;
        color: #333;
      }
      .content h2 {
        margin-top: 0;
      }
      .button {
        display: inline-block;
        margin: 20px 0;
        padding: 12px 25px;
        background-color:#4e342e;
        color: white;
        text-decoration: none;
        border-radius: 6px;
        font-weight: bold;
      }
      .footer {
        padding: 15px;
        font-size: 13px;
        color: #888;
        text-align: center;
        background-color: #f0f9ff;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Password Reset Request</h1>
      </div>
      <div class="content">
        <h2>Hello,</h2>
        <p>We received a request to reset your password. Click the link below to set a new password:</p>
  
        <a href="${
          process.env.BASE_URL
        }/Pages/reset-password/${id}/${myToken}" >${
        process.env.BASE_URL
      }/Pages/reset-password/${id}/${myToken}</a>
        <p><strong>Note:</strong> This link will expire after a short time for your security.</p>
        <p style="color: red;"><strong>Do not share this email or link with anyone.</strong> If you didn’t request a password reset, please ignore this email or contact support.</p>
      </div>
      <div class="footer">
        &copy; ${new Date().getFullYear()} Delhi Book Store.. All rights reserved.
      </div>
    </div>
  </body>
  </html>
  `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Mail has been sent: ", info.response);
      }
    });
  } catch (error) {
    console.error("Error while sending email: ", error);
  }
};
const signUp = async (req, res) => {
  try {
    const { fullName, email, password } = req.body || {};
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    await User.create({ fullName, email, password });
    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log("sign up error", error);
    return res.status(500).json({ message: "sign up server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (!emailRegex.test(email))
      return res.status(400).json({ message: "Invalid email" });
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Incorrect password" });
    }
    const token = await user.generateJwtToken();
    res.cookie("token", token, cookieOptions);

    return res.status(200).json({
      message: "User logged in successfully",
      user: { id: user._id, fullName: user.fullName, email: user.email },
    });
  } catch (error) {
    console.log("login error", error);
    return res.status(500).json({ message: "login server error" });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token", cookieOptions);
    return res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.log("logout error", error);
    return res.status(500).json({ message: "logout server error" });
  }
};

const GetSingleUser = async (req, res) => {
  try {
    const { _id } = req.user;
    if (!_id) {
      return res.status(400).json({ message: "User id is required" });
    }
    const user = await User.findById(_id).select(
      "-password -resetPasswordToken -resetPasswordExpires -role"
    );
    return res.status(200).json({ message: "Single user", user });
  } catch (error) {
    console.log("get single user error", error);
    res.status(500).json({ message: "get single user server error" });
  }
};

const ForgotPassword = async (req, res) => {
  try {
    const { email } = req.body || {};
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const token = crypto.randomBytes(32).toString("hex");

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 1000 * 60 * 15;
    await user.save();
    await sentResetPasswordMail(email, token, user._id);

    return res
      .status(200)
      .json({ message: "Reset password token sent to your email" });
  } catch (error) {
    console.log("forgot password error", error);
    return res.status(500).json({ message: "forgot password server error" });
  }
};

const ResetPassword = async (req, res) => {
  try {
    const { id, token } = req.params || {};
    const { password } = req.body || {};
    if (!id || !token) {
      return res.status(400).json({ message: "User id and token is required" });
    }
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    if (!user.resetPasswordToken) {
      return res
        .status(400)
        .json({ message: "Reset password token not found" });
    }
    if (user.resetPasswordExpires < Date.now()) {
      return res.status(400).json({ message: "Reset password token expired" });
    }
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    if (hashedToken !== user.resetPasswordToken) {
      return res.status(400).json({ message: "Invalid reset password token" });
    }
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    return res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.log("reset password error", error);
    return res.status(500).json({ message: "reset password server error" });
  }
};

const verifyLoggedIn = async (req, res) => {
  try {
    const { _id } = req.user;
    if (!_id) {
      return res.status(400).json({ message: "User id is required" });
    }
  
    const user = await User.findById(_id).select(
      "-password -resetPasswordToken -resetPasswordExpires -role"
    );
  
    return res
      .status(200)
      .json({ message: "User logged in successfully", user });
  } catch (error) {
    console.log("verify logged in error", error);
    return res.status(500).json({ message: "verify logged in server error" });
  }
};
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (!emailRegex.test(email))
      return res.status(400).json({ message: "Invalid email" });
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "User not found" });
    if (user.role !== "admin") {
      return res
        .status(400)
        .json({ message: "Unauthorized! You are not admin" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Incorrect password" });
    }
    const token = await user.generateJwtToken();
    res.cookie("token", token, cookieOptions);
    return res.status(200).json({
      message: "User logged in successfully",
      user: { id: user._id, fullName: user.fullName, email: user.email },
    });
  } catch (error) {
    console.log("admin login error", error);
    return res.status(500).json({ message: "admin login server error" });
  }
};

const GetAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res
      .status(200)
      .json({ message: "Users fetched successfully", users });
  } catch (error) {
    console.log("get all users error", error);
    return res.status(500).json({ message: "get all users server error" });
  }
};
const updateProfile = async (req, res) => {
  try {
    const userId = req?.user?._id;
    if (!userId) {
      return res.status(400).json({ message: "you are not logged in" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const localPath = req.file.path;
    const profileUrl = await uploadOnCloudinary(localPath);
    user.profileImage = profileUrl;
    await user.save();
    return res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    console.log("update profile error", error);
    return res.status(500).json({ message: "update profile server error" });
  }
};
export {
  signUp,
  login,
  logout,
  adminLogin,
  GetSingleUser,
  ForgotPassword,
  ResetPassword,
  verifyLoggedIn,
  updateProfile,
  GetAllUsers,
};
