const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Post, User } = require('../../models');

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
        attributes: ['username', 'id']
      }
    ]
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: `No posts found with id ${req.params.id}` });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  // { "origin": "San Diego, CA", "destination": "Dallas, TX", "pickup_date": "2022-1-20", "weight": 30000, "miles": 1000, "equipment_type": "Reefer", "user_id": 1 }

  Post.create({
    origin: req.body.origin,
    destination: req.body.destination,
    pickup_date: req.body.pickup_date,
    weight: req.body.weight,
    miles: req.body.miles,
    equipment_type: req.body.equipment_type,
    user_id: req.session.user_id
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  Post.update(
    {
      origin: req.body.origin,
      destination: req.body.destination,
      pickup_date: req.body.pickup_date,
      weight: req.body.weight,
      miles: req.body.miles,
      equipment_type: req.body.equipment_type
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
  Post.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: `No posts found with id ${req.params.id}` });
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