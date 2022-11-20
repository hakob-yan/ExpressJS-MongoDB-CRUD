const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
    title: String,
    body: String,
    datePosted: {
        default: new Date(),
        type: Date
    }
})

const BlogPost = mongoose.model('BlogPost', BlogPostSchema);
module.exports = BlogPost