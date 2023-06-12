import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    location: String,
    description: String,
    picture: {
        type: String,
        default: ""
    },
    userPicture: String,
    likes: {
        type: Map,
        of: Boolean
    },
    comments: {
        type: Array,
        default: []
    },
}, {timestamps: true})

const Post = mongoose.model("Post", PostSchema);
export default Post;