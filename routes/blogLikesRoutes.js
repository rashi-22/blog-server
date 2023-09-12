const BlogLikes = require("../models/blogLikes");

exports.addLikes = async(req,res) => {
    try{
        const user_id = req.body?.user_id;
        const blog_id = req.body?.blog_id;
        if(!user_id){
            return res.status(404).send({message: "user id not found"});
        }
        if(!blog_id){
            return res.status(404).send({message: "Blog id not provided! "})
        }
        const blogLikesexist = await BlogLikes.findOne({blog_id,user_id});
        if(blogLikesexist) return res.status(200).send(null)
        let blogLikes = new BlogLikes()
        blogLikes.user_id = user_id;
        blogLikes.blog_id = blog_id;
        await blogLikes.save();
        return res.status(200).send(blogLikes)
    }catch(ex){
        return res.status(500).send({message: ex.message})
    }
}