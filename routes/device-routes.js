const router = require('express').Router();
const { Device, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/edit/:id', withAuth, (req, res) => {
  Device.findOne({
    where: {
    id: req.params.id
  },
    attributes: [
      'id',
      'name',
      'device'
    ],
    include: [
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      if (dbPostData) {
        const post = dbPostData.get({ plain: true });
        
        res.render('edit-post', {
          post,
          loggedIn: req.session.loggedIn,
          username: req.session.username
        });
      } else {
        res.status(404).end();
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;