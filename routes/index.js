const router = require('express').Router();
const homeRoutes = require('./home-routes.js');
const apiRoutes = require('./api');
const myPostsRoutes = require('./my-posts-routes.js');

router.use('/', homeRoutes);
router.use('/', myPostsRoutes);
router.use('/api', apiRoutes);

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;