const logger = require('../common/logger');
const ObjectID = require('bson-objectid');
const ApiError = require('../errors/ApiError');

const products = [
  {
    id: '5f48e440f8616cd0e3da04f2',
    name: 'React Note',
    price: 2000,
    info: 'Lorem ipsum dolor sit amet',
    avg_stars: 4,
    total_reviews: 200,
    category: '5f3e95643c984d3ddcb527cb',
    img_url: '/uploads/5f48e440f8616cd0e3da04f2.jpeg',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const getProductList = (req, res, next) => {
  res.render('pages/product/list', { products });
};

const getProduct = (req, res, next) => {
  const productId = req.params.productId;

  if (productId === 'new') {
    res.render('pages/product/new');
    return;
  }

  const product = products.find((u) => u.id === productId);
  if (!product) throw new Error('상품을 찾을 수 없습니다.');
  res.render('pages/product/edit', { product });
};

const saveProduct = (req, res, next) => {
  const productId = req.params.productId;
  const img_url = req.file ? `/${req.file.path}` : null;
  const product = products.find((u) => u.id === productId);

  if (!product) next(new ApiError('상품을 찾을 수 없습니다.', 404));

  try {
    const toUpdate = img_url
      ? { ...req.body, img_url, updatedAt: new Date() }
      : { ...req.body, updatedAt: new Date() };
    Object.assign(product, toUpdate);
    logger.info(product);
    res.redirect(302, `/admin/product/${productId}`);
  } catch (e) {
    next(new ApiError(e.message, 500));
  }
};

const createProduct = (req, res, next) => {
  logger.info('Create Product', req.body);
  const img_url = req.file ? `/${req.file.path}` : null;
  products.push({
    id: ObjectID().toHexString(),
    avg_stars: 0,
    total_reviews: 0,
    img_url: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...req.body,
  });
  res.redirect(302, '/admin/product');
};

module.exports = {
  getProductList,
  getProduct,
  saveProduct,
  createProduct,
};
