const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/my-posts', withAuth, (req, res) => {
  Post.findAll({
    where: {
      user_id: req.session.user_id
    },
    attributes: [
      'id', 
      'origin', 
      'destination', 
      'pickup_date', 
      'weight', 
      'miles', 
      'equipment_type'
    ],
    order: [['createdAt', 'ASC']],
    include: [
      {
        model: User,
        attributes: ['username', 'id']
      }
    ]
  })
      .then(dbPostData => {
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('my-posts', { 
            posts,
            loggedIn: req.session.loggedIn,
            username: req.session.username
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/edit/:id', withAuth, (req, res) => {
  Post.findOne({
    where: {
    id: req.params.id
  },
    attributes: [
      'id',
      'origin',
      'destination',
      'pickup_date',
      'weight',
      'miles',
      'equipment_type'
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