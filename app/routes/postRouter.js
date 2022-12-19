import { Router } from "express"

const postRouter = Router()

import * as postController from '../controllers/postController.js'

postRouter.post("/posts", postController.createPost)

postRouter.get("/posts", postController.getAllPost)

postRouter.get("/categories/:category/posts", postController.getPostsOfCategory)

postRouter.get("/categories/:category/posts/suggested", postController.getSuggestedPosts)

postRouter.get("/posts/search", postController.getPostsByQuery)

postRouter.get("/posts/:postId", postController.getPost)

postRouter.put("/posts/:postId", postController.updatePost)

postRouter.delete("/posts/:postId", postController.deletePost)

export default postRouter