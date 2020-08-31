const logger = require('../common/logger');
const ObjectID = require('bson-objectid');

const users = [
  {
    id: '5f3e95643c984d3ddcb527cb',
    name: 'test00',
    email: 'test00@gmail.com',
    loginCount: '1',
    lastLoginAt: new Date(),
    createAt: new Date(),
  },
  {
    id: '5f3e956ad5fe5640e22657ce2',
    name: 'test01',
    email: 'test01@gmail.com',
    loginCount: '3',
    lastLoginAt: new Date(),
    createAt: new Date(),
  },
];

const getUsers = (req, res, next) => {
  res.render('pages/user/list', { users });
};

const getUser = (req, res, next) => {
  const userId = req.params.userId;

  if (userId === 'new') {
    res.render('pages/user/new');
    return;
  }

  const user = users.find((u) => u.id === userId);
  if (!user) next(new Error('사용자를 찾을 수 없습니다.'));

  res.render('pages/user/edit', { user });
};

const createUser = (req, res, next) => {
  logger.info('Create User', req.body);
  users.push({
    id: ObjectID().toHexString(),
    createAt: new Date(),
    loginCount: 0,
    lastLoginAt: null,
    ...req.body,
  });
  res.redirect(302, '/admin/user');
};

const saveUser = (req, res, next) => {
  const userId = req.params.userId;
  const user = users.find((u) => u.id === userId);
  if (!user) next(new Error('사용자를 찾을 수 없습니다.'));

  logger.info(req.body);
  Object.assign(user, req.body);
  // refesh로 재전송 되는걸 맊을 수 있다.
  res.redirect(302, `/admin/user/${userId}`);
};

const deleteUser = (req, res, next) => {
  const userId = req.params.userId;
  const userIdx = users.findIndex((u) => u.id === userId);
  users.splice(userIdx, 1);
  res.redirect(302, '/admin/user');
};

module.exports = {
  getUsers,
  getUser,
  saveUser,
  deleteUser,
  createUser,
};
