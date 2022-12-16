const mongoose = require("mongoose");
const Post = require("../Post/Post");
//userschema

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: [true, "First Name is required"] },
    lastName: { type: String, required: [true, "Last Name is required"] },
    profilePhoto: { type: String },
    email: { type: String, required: [true, "Email is required"] },
    password: { type: String, required: [true, "password is required"] },
    isBlocked: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
    role: { type: String, enum: ["admin", "Guest", "Editor"] },
    viewers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    blocked: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    // plan: { type: String, enum: ["Free", "Premium", "Pro"], default: "Free" },
    userAward: [
      { type: String, enum: ["Bronze", "Silver", "Gold"], default: "Bronze" },
    ],
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

//Hooks
//pre(before record is saved) here we use (find or findOne)
userSchema.pre("findOne", async function (next) {
  //getting user id
  const userId = this._conditions._id;

  //getting the user post
  const posts = await Post.find({ user: userId });

  //getting user's last post
  const lastPost = posts[posts.length - 1];

  //get last post date
  const lastPostDate = new Date(lastPost.createdAt);
  //get last post date in string format
  const lastPostInString = lastPostDate.toDateString();

  //add lastpost date as virtuals to users
  userSchema.virtual("lastPostDate").get(function () {
    return lastPostInString;
  });
  next();
});
//post(after record is saved)here we use (create, save)
userSchema.post("save", function (next) {});

//get fullname
userSchema.virtual("fullname").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

//get user initials
userSchema.virtual("initials").get(function () {
  return `${this.firstName[0]}${this.lastName[0]}`;
});

//get post count virtual
userSchema.virtual("postCounts").get(function () {
  return this.posts.length;
});
//get following count virtual
userSchema.virtual("followingCounts").get(function () {
  return this.following.length;
});
//get follower count virtual
userSchema.virtual("followersCounts").get(function () {
  return this.followers.length;
});
//get viewers count virtual
userSchema.virtual("viewersCounts").get(function () {
  return this.viewers.length;
});
//get blocked users count virtual
userSchema.virtual("blockedUsersCounts").get(function () {
  return this.blocked.length;
});
const User = mongoose.model("User", userSchema);
module.exports = User;
