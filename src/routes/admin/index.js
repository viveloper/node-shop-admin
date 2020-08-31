const user = require('../../controllers/user');
const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('pages/index');
});

router.get('/user', user.getUsers);

router.get('/user/:userId', user.getUser);

router.put('/user/:userId', user.saveUser);

router.delete('/user/:userId', user.deleteUser);

router.post('/user', user.createUser);

module.exports = router;
