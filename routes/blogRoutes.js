const Blog = require("../models/blogs")
const BlogLikes = require("../models/blogLikes")
const BlogComments = require("../models/blogComments")
const { sanitizeBlog } = require("../helper/blogHelper")

exports.upsertBlog = async(req, res) => {
    try{
        const blog_id = req.body?.blog_id;
        const user_id = req.body.user_id;
        const title = req.body?.title;
        const description = req.body?.description;
        const content = req.body?.content;
        if(!user_id){
            return res.status(500).send({message: "User id not provided"})
        }
        let blog = new Blog();
        if(blog_id){
            blog = await Blog.findOne({is_delete: false, author: user_id, _id: blog_id});
        }
        else{
            blog.author = user_id;
            blog.content = content;
            blog.date_created = new Date()
            blog.is_delete = false;
        }
        blog.title = title;
        blog.description = description;
        await blog.save()
        return res.status(200).send(sanitizeBlog(blog));
    }catch(ex){
        return res.status(500).send({message: ex?.message})
    }
}

exports.deleteBlog = async(req,res) => {
    try{
        const blog_id = req.body.blog_id;
        if(!blog_id){
            return res.status(500).send({message: "Blog id is not provided !"});
        }
        const blog = await Blog.findOneAndUpdate({_id: blog_id}, {is_delete: true},{returnDocument: "after"})
        if(!blog){
            return res.status(500).send({message: "No such blog found for the provided id!"})
        }
        return res.status(200).send(sanitizeBlog(blog));
    }catch(ex){
        return res.status(500).send({message: ex.message})
    }
}

exports.fetchBlogs = async(req, res) => {
    try{
        const limit = req.body.limit || 10;
        const offset = req.body.offset || 0;
        
        let blogs = [];
        const data = await Promise.all([Blog.find({is_delete: false}).sort({date_created: -1}).skip((offset)).limit(limit), 
            Blog.find({is_delete: false}).count()]);
        const blogsData = {
            blogs: data[0],
            totalBlogs: data[1]
        }
        await Promise.all(
            blogsData.blogs?.map(async(blog) => {
                let newBlog = {...sanitizeBlog(blog)}
                const likes = await BlogLikes.find({blog_id: blog?._id});
                if(likes?.length)
                    newBlog.likes = likes
                const comments = await BlogComments.find({blog_id: blog?._id})
                if(comments?.length)
                    newBlog.comments = comments;
                blogs.push(newBlog)
            })
        )
        return res.status(200).send({data: blogs,totalBlogs: data[1]});
    }catch(ex){
        return res.status(500).send({message: ex.message})
    }
}