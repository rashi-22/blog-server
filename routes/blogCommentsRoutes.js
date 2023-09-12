const BlogComments = require("../models/blogComments")

exports.addBlogComments = async(req, res) => {
    try{
        const blog_id =  req.body.blog_id;
        const user_id = req.body.user_id;
        const comment = req.body.comment;

        if(!user_id){
            return res.status(404).send({message: "User id not provided!"})
        }
        if(!blog_id){
            return res.status(404).send({message: "Blog id not provided!"})
        }
        if(!comment){
            return res.status(500).send({message: "No comment Found!"})
        }
        let blogComments = new BlogComments();
        blogComments.user_id = user_id;
        blogComments.blog_id = blog_id;
        blogComments.comment = comment;
        blogComments.date_created = new Date();
        await blogComments.save();
        return res.status(200).send(blogComments)
    }catch(ex){
        return res.status(500).send({message: ex?.message})
    }
}