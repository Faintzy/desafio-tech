module.exports = (app) => {
    
    const controller = app.controllers.PostsController;

    app.route('/posts')
        .get(controller.listPosts)
        .post(controller.insertPost);
    
    app.route('/posts/:id')
        .get(controller.getPostById);

    app.route('/posts/comments')
        .post(controller.insertComment);

    app.route('/posts/:id/comments')
        .get(controller.getCommentByPostId);

}