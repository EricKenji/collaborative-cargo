const router = require('express').Router();
const homeRoutes = require('./home-routes.js');
const apiRoutes = require('./api');
const deviceRoutes = require('./device-routes.js');

router.use('/', homeRoutes);
router.use('/', deviceRoutes);
router.use('/api', apiRoutes);

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;