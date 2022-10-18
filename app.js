const express = require("express");

const db = require("./db");

const app = express();
const PORT = 5000;

app.use(express.json());

// FUNCTIONS
// get all posts & by query.title
const getAllPosts = (req, res) => {
  if (req.query.title) {
    const reqTitle = req.query.title;
    const post = db.apiData.find((post) => post.title === reqTitle);
    post ? res.json(post) : res.json({ message: "No such post" });
  }
  res.json(db.apiData);
};

// create new post
const createNewPost = (req, res) => {
  const newPost = req.body;
  newPost.id = db.apiData.length + 1;
  db.apiData.push(newPost);
  res.json({ message: "Success", newPost });
};

// get post by id
const getPostById = (req, res) => {
  const reqPostId = Number(req.params.id);
  const databasePost = db.apiData.find((post) => post.id === reqPostId);

  if (!databasePost) res.status(404).send({ message: "No such post" });

  res.send(databasePost);
};

// update post
const updatePost = (req, res) => {
  const id = Number(req.params.id);
  const newData = req.body;
  const postToUpdate = db.apiData.find((post) => post.id === id);
  const indexOfPost = db.apiData.indexOf(postToUpdate);
  const updatedPost = { ...postToUpdate, ...newData };
  db.apiData.splice(indexOfPost, 1, updatedPost);
  res.json({ message: "success", updatedPost });
};

// delete post
const deletePost = (req, res) => {
  console.log("Hello there");

  const id = Number(req.params.id);
  console.log("id: ", id);
  const postToDelete = db.apiData.find((post) => post.id === id);
  console.log("post to delete: ", postToDelete);
  if (!postToDelete) {
    res.status(404).send({ message: "No such post" });
  }

  const postIndex = db.apiData.indexOf(postToDelete);
  console.log("postIndex: ", postIndex);

  db.apiData.splice(postIndex, 1);
  res.send({ message: "Successfully deleted" });
};

// ROUTES
app.route("/posts").get(getAllPosts).post(createNewPost);
app.route("/posts/:id").get(getPostById).put(updatePost).delete(deletePost);

// creating server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
