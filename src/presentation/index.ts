import express from "express";
import { signUpEndPoint } from "./endpoints/users/signUp";
import { loginEndPoint } from "./endpoints/users/login";
import { friendUserEndPoint } from "./endpoints/users/friendUser";
import { unfriendUserEndPoint } from "./endpoints/users/unfriendUser";
import { createPostEndpoint } from "./endpoints/posts/createPostEndPoint";
import { getFeedEndPoint } from "./endpoints/feed/getFeedEndPoint";
import { getFeedByTypeEndPoint } from "./endpoints/feed/getFeedByTypeEndPoint";
import { likePostEndPoint } from "./endpoints/posts/likePostEndPoint";
import { dislikePostEndPoint } from "./endpoints/posts/dislikePostEndPoint";
import { commentPostEndPoint } from "./endpoints/posts/commentPostEndPoint";

var cors = require("cors")
const app = express();
app.use(cors())
app.use(express.json());

//Users

app.post("/signup", signUpEndPoint);
app.post("/login", loginEndPoint);
app.post("/user/addfriend", friendUserEndPoint);
app.post("/user/unfriend", unfriendUserEndPoint);

//Posts

app.post("/createPost", createPostEndpoint);
app.post("/post/like", likePostEndPoint);
app.post("/post/dislike", dislikePostEndPoint);
app.post("/post/comment", commentPostEndPoint);

//Feed

app.get("/feed", getFeedEndPoint);
app.get("/feed/:postType", getFeedByTypeEndPoint);

export default app;
