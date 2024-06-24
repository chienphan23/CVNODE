import mongoose from "mongoose";
import validator from "validator";
import brcyptjs from "bcryptjs";
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provider your name"],
      unique: true
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: [true],
      validate: {
        validator: function (el) {
          return validator.isEmail(el);
        },
        message: "Please provide a valid email",
      },
    },
    password: {
      type: String,
      required: [true, "Please provide your password"],
      minlength: 8,
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, "Please comfirm your password"], // thông tin khi nhập vào là bắt buộc, khi vào database có thể xoá
      validate: {
        // this only works on Save and Create (chỉ kiểm tra lúc tạo tài liệu)
        validator: function (el) {
          return el === this.password;
        },
        message: "PasswordComfirm is not same password",
      },
    },
    avatar: {
      type: String,
      default: "default.jpg",
    },
    bio: {
      type: String,
      default: ""
    },
    birthday: {
      type: Date,
    },
    gender: {
      type: Boolean,
      default: true,
    },
    address: {
      type: String,
    },
    description: {
      type: String,
    },
    followers: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      }
    ],
    following: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      }
    ],
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      select: false,
    },
    posts: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Post",
      },
    ],
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
// userSchema.virtual('posts', {
//     ref:'Post',
//     foreignField: 'user',
//     localField: '_id'
// })
// userSchema.pre(/^find/, function(next) {    // nếu không có pre này thì chỉ lấy id
//     this.populate({
//         path: 'post',
//     })
//     next()
// })

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    // nếu trường mk không thay đổi
    return next();
  }
  // Hash the password with cost of 12
  this.password = await brcyptjs.hash(this.password, 12); // hashcode mat khau
  this.passwordConfirm = undefined; // xoá trường xác nhận mật khẩu
  next();
});

// userSchema.pre(/^find/, function (next) {
//     this.populate({
//       path: 'posts'
//     })
//     next()
// });

userSchema.methods.correctPassword = async (passwordInput, userPassword) => {
    return await brcyptjs.compare(passwordInput, userPassword)
}

userSchema.methods.createPasswordResetToken = function () {
  const token = jwt.sign({id: this._id }, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN});
  this.passwordResetToken = token;
  this.passwordResetExpires = Date.now() + 10*60*1000;
  console.log(this)
  return token;
}

userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
  if(this.passwordChangedAt){
    const changedTimestamp = this.passwordChangedAt.getTime() / 1000;
    // console.log(changedTimestamp, ":" , JWTTimestamp)
    return JWTTimestamp <= changedTimestamp; // 100 < 200
  }
  // False means not changes
  return false
}
const User = mongoose.model("User", userSchema);
export default User;

