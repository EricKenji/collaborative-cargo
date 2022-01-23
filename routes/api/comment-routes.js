const router = require('express').Router();
const { Comment, User } = require('../../models');

router.get('/', (req, res) => {
    Comment.findAll()
      .then(dbCommentData => res.json(dbCommentData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', (req, res) => {

    if (req.session) {
        Comment.create({
            comment_text: req.body.comment_text,
            from: req.session.username,
            user_id: req.body.user_id
        })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    }
});

module.exports = router;