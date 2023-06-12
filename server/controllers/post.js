import Post from "../models/Post.js";
import User from "../models/User.js";

//CREATE
export const createPost = async (req, res) => {
    try {
        req.body.picture = req.file.filename;
        const {userId, description, picture} = req.body;
        const user = await User.findById(userId);
        const newPost = new Post({
            userId,
            firstname: user.firstname,
            lastname: user.lastname,
            location: user.location,
            description,
            userPicture: user.picture,
            "picture": picture,
            likes: {},
            comments: []
        });
        await newPost.save();

        const post = await Post.find({userId: userId});

        res.status(201).json(post);
    } catch (err) {
        res.status(400).json({message: err.message})
    }
}

//READ
export const getFeedPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (err) {
        res.status(404).json({message: err.message});
    }
}

export const getUserPosts = async (req, res) => {
    try {
        const {userId} = req.params;
        const posts = await Post.find({userId: userId});
        res.status(200).json(posts);
    } catch (err) {
        res.status(404).json({message: err.message});
    }
}

export const likePost = async (req, res) => {
    try {
        const {id} = req.params;
        const {userId} = req.body;
        console.log(userId.toString());
        const post = await Post.findById(id);
        console.log(post.likes.has(userId))
        if (post.likes.has(userId)) {
            if (post.likes.get(userId)) {
                post.likes.delete(userId);
            }
            else {
                post.likes.set(userId, true);
            }
        } else {
            post.likes.set(userId, true);
        }

        console.log("post.likes.get(userId)");
        const updatedPost = await Post.findByIdAndUpdate(
            id, {likes: post.likes}, {new: true}
        )
        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(404).json({message: err.message});
    }
}