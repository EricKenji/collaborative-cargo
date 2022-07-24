const router = require('express').Router();
const { Device, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
  Device.findAll({
    where: {
      user_id: req.session.user_id
    },
    attributes: [
      'id', 
      'name', 
      'device'
    ],
    order: [['id', 'DESC']],
    include: [
      {
        model: User,
        attributes: ['username', 'id']
      }
    ]
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
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
        attributes: ['username', 'id']
      }
    ]
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: `No devices found with id ${req.params.id}` });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', withAuth, (req, res) => {
  Device.create({
    name: req.body.name,
    device: req.body.device,
    user_id: req.session.user_id
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  Device.update(
    {
      name: req.body.name,
      device: req.body.device
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: `No posts found with id ${req.params.id}` });
        return;
      }
      res.json({ message: `Post ${req.params.id} updated`});
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  Device.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: `No device found with id ${req.params.id}` });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;