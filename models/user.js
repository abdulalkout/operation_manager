const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const SALT_ROUNDS = 6;
const bcrypt = require("bcrypt");
const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: true,
    },
    password: {
      type: String,
      trim: true,
      minLength: 3,
      required: true,
    },
    position: {
      type: String,
      trim: true,
      enum: ["Maneger", "Company-Man"],
      minLength: 3,
      required: true,
    },
    logs: [
      {
        name: { type: String },
        createdAt: { type: Date, default: Date.now },
        activity: { type: String },
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
        return ret;
      },
    },
  }
);

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
    return next();
  } catch (error) {
    console.log(error.messege);
    return next(error);
  }
});

module.exports = mongoose.model("User", userSchema);
