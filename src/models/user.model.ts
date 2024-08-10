import { model, Schema, Types } from "mongoose";
import bcrypt from "bcryptjs";
import { SALT_ROUNDS } from "../utils/const";

export interface IUser {
  id?: string;
  name: string;
  email: string;
  password: string;
  chats?: Types.ObjectId[];
  isPasswordMatch: (password: string) => Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    chats: [
      {
        type: Types.ObjectId,
        ref: "Chat",
      },
    ],
  },
  {
    timestamps: true,
  }
);

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.methods.isPasswordMatch = async function (
  password: string
): Promise<boolean> {
  const user = this;
  return bcrypt.compare(password, user.password);
};

/**
 * Hash the password before saving the user model
 */
userSchema.pre("save", async function preSave(next) {
  const user = this;
  if (user.isModified("password")) {
    const password = await bcrypt.hash(user.password, SALT_ROUNDS);
    const now = new Date();
    user.password = password;
  }
  next();
});

/**
 * Remove the password field from the user object
 */
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  user.id = user._id.toString();
  delete user._id;
  delete user.__v;
  return user;
};

const User = model<IUser>("User", userSchema);

export default User;
