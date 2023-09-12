
exports.sanitizeBlog = (blog) => {
    let blogdata = {
        id: blog?._id,
        author:blog?.author,
        date_created: blog?.date_created,
        content: blog?.content,
        title: blog?.title,
        description: blog?.description,
        is_delete: blog?.is_delete
    }
    return blogdata;
}
