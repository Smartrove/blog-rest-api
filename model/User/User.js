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
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
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
  //populate posts using schema pre hook
  this.populate({
    path: "posts",
  });
  //getting user id
  const userId = this._conditions._id;

  //getting the user post
  const posts = await Post.find({ user: userId });

  //getting user's last post
  const lastPost = posts[posts.length - 1];

  //get last post date
  // const lastPostDate = new Date(lastPost && lastPost.createdAt);
  //using optional chaining
  const lastPostDate = new Date(lastPost?.createdAt);
  //get last post date in string format
  const lastPostInString = lastPostDate.toDateString();

  //add lastpost date as virtual to users
  userSchema.virtual("lastPostDate").get(function () {
    return lastPostInString;
  });

  //get if user is active for 30days
  const currentDate = new Date();

  // the diff btw currentDate and last post date
  const diff = currentDate - lastPostDate;

  //get timestamps diff in days
  const diffInDays = diff / (1000 * 3600 * 24);

  if (diffInDays > 30) {
    //add virtual properties to the profile
    userSchema.virtual("isInActive").get(function () {
      return true;
    });

    //find user by ID and update
    await User.findByIdAndUpdate(userId, { isBlocked: true }, { new: true });
  } else {
    userSchema.virtual("isInActive").get(function () {
      return false;
    });
    //find user by ID and update
    await User.findByIdAndUpdate(userId, { isBlocked: false }, { new: true });
  }

  //convert diffInDays to daysAgo
  const daysAgo = Math.floor(diffInDays);
  console.log(daysAgo);

  //convert diffInDays to daysAgo

  //add last active date virtual to user profile
  userSchema.virtual("lastActiveDate").get(function () {
    //check if daysAgo is less than zero
    const daysAgo = Math.floor(diffInDays);

    if (daysAgo <= 0) {
      return "Today";
    }
    //check if daysAgo is equal to 1
    if (daysAgo === 1) {
      return "Yesterday";
    }

    //if daysAgo is greater than 1
    if (daysAgo > 1) {
      return `${daysAgo} days ago`;
    }
  });

  //update user award base on the number of posts
  const numOfPosts = posts.length;

  //check if users posts is less than 10
  if (numOfPosts < 10) {
    await User.findByIdAndUpdate(
      userId,
      {
        userAward: "Bronze",
      },
      { new: true }
    );
  }
  if (numOfPosts > 10) {
    await User.findByIdAndUpdate(
      userId,
      {
        userAward: "Silver",
      },
      { new: true }
    );
  }
  if (numOfPosts > 20) {
    await User.findByIdAndUpdate(
      userId,
      {
        userAward: "Gold",
      },
      { new: true }
    );
  }
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
