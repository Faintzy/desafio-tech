const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('./backend/models/db.json');
const db = lowdb(adapter)

module.exports = (app) => {

    const controller = {};

    controller.listPosts = (req, res) => {

        res.status(200).json(
            db.get('posts')
            .value()
        );

    }

    controller.getPostById = (req, res) => {

        var id = parseInt(req.params.id)

        var post = db.get('posts')
        .find({ 
            id: id
        })
        .value();
        
        if(!post) {

            res.status(404).json({
                'code': 404,
                'desc': "404 Not found"
            });

        } else {

            res.status(200).json({
                'code': 200,
                'desc': post
            });
            
        }

    }

    controller.insertPost = (req, res) => {

        var keyslen = db.get('posts').value().length

        db.get('posts')
            .push({
                id: keyslen + 1,
                message: req.body.message,
                comments: []
            })
            .write();

        res.status(201).json({
            'code': 201,
            'desc': db.get('posts').value()
        });

    }

    controller.insertComment = (req, res) => {

        var comment = req.body.comment;
        var id = parseInt(req.body.id);

        var comments = db
            .get('posts')
            .find( { id: id })
            .get('comments')
            .value();

        comments.push(comment);
        
        db.get('posts')
            .find({ id: id })
            .assign({comments})
            .write();

        res.status(201).json({
            'code': 201,
            'desc': 'Comentário inserido com sucesso!'
        });

    }

    controller.getCommentByPostId = (req, res) => {

        var id = parseInt(req.params.id);

        var comments = db.get
                ('posts')
                .find({ id: id })
                .get('comments')
                .value();

        if(!comments) {

            res.status(404).json({
                'code': 404,
                'desc': '404 Not found'
            });

        } else {

            res.status(200).json({
                'code': 200,
                'desc': comments
            });

        }
        
    }

    return controller;
}