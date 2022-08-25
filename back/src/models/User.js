import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    surName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
    },
    birthDate: {
      type: Date,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    nickName: {
      type: String,
      required: true
    },
    profession: {
      type: String,
      required: true
    },
    bio: {
      type: String
    }, 
    comments: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post'
    }],
    password: {
      type: String,
      required: true,
      select: false
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
  }
);

UserSchema.pre("save", async function(next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
})

const User = mongoose.model('User', UserSchema);
export default User;