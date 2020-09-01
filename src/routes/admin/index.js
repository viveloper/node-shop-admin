const user = require('../../controllers/user');
const router = require('express').Router();
const product = require('../../controllers/product');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.get('/', (req, res) => {
  res.render('pages/index');
});

router.get('/user', user.getUsers);

router.get('/user/:userId', user.getUser);

router.put('/user/:userId', user.saveUser);

router.delete('/user/:userId', user.deleteUser);

router.post('/user', user.createUser);

router.get('/product', product.getProductList);

router.get('/product/:productId', product.getProduct);

router.post('/product', product.createProduct);

router.post('/product/:productId', upload.single('image'), product.saveProduct);

module.exports = router;
