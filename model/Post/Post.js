const mongoose = require("mongoose");

//postschema

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Post Title is required"],
      trim: true,
    },
    description: { type: String, required: [true, "Description is required"] },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
    },
    numbViews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    disLikes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please Author is required"],
    },
    photo: {
      type: String,
      // required: [true, "Post Image is required"],
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

//hooks
postSchema.pre(/^find/, function (next) {
  //add view counts as virtual
  postSchema.virtual("viewCounts").get(function () {
    const post = this;
    return post.numbViews.length;
  });
  //add likes counts as virtual
  postSchema.virtual("likesCounts").get(function () {
    const post = this;
    return post.likes.length;
  });
  //add dislikes counts as virtual
  postSchema.virtual("dislikesCounts").get(function () {
    const post = this;
    return post.disLikes.length;
  });

  //check the most liked post in percentage
  postSchema.virtual("likesPercentage").get(function () {
    const post = this;
    //add + to convert to number
    const total = post.likes.length + +post.disLikes.length;
    const percentage = (post.likes.length / total) * 100;
    return `${percentage}%`;
  });
  //check the most disliked post in percentage
  postSchema.virtual("dislikesPercentage").get(function () {
    const post = this;
    //add + to convert to number
    const total = post.disLikes.length + +post.disLikes.length;
    const percentage = (post.disLikes.length / total) * 100;
    return `${percentage}%`;
  });

  //post date info
  postSchema.virtual("postDate").get(function () {
    const post = this;
    const date = new Date(post.createdAt);
    const daysAgo = Math.floor((Date.now() - date) / 86400000);
    return daysAgo === 0
      ? "today"
      : daysAgo === 1
      ? "yesterday"
      : `${daysAgo} days ago`;
  });
  next();
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
