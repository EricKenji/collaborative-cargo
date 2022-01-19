const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

router.get('/', (req, res) => {
  Post.findAll({
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
        res.render('homepage', { 
            posts,
            loggedIn: req.session.loggedIn
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/sign-up', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('sign-up');
});

router.get('/users', (req, res) => {
  User.findAll({
    attributes: { exclude: ['password'] }
  })
  .then(dbPostData => {
    const users = dbPostData.map(user => user.get({ plain: true }));
    res.render('users', { 
        users,
        loggedIn: req.session.loggedIn
    });
  })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});

router.get('/user/:id', (req, res) => {
  User.findOne({
    attributes: { exclude: ['password'] },
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'username'
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text'],
        include: {
          model: User,
          attributes: ['username', 'id']
        }
      }
    ]
  })
  .then(dbPostData => {
    if (!dbPostData) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }

    // serialize the data
    const user = dbPostData.get({ plain: true });

    // pass data to template
    res.render('single-user', { 
        user,
        loggedIn: req.session.loggedIn
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

router.get('/post/:id', (req, res) => {
    Post.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'id',
        'post_url',
        'title',
        'created_at',
        [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
      ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username', 'id']
        }
      ]
    })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
  
        // serialize the data
        const post = dbPostData.get({ plain: true });
  
        // pass data to template
        res.render('single-post', { 
            post,
            loggedIn: req.session.loggedIn
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

router.get('/create-post', (req, res) => {
    res.render('create-post');
  
});

module.exports = router;