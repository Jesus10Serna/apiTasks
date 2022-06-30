const { express } = require('express');

// Contollers
const {
    createUser,
    getAllActiveUsers,
    updateUser,
    deleteUser,
} = require('../controllers/user.controller');

// Middlewares
const { createUserValidators } = require('../middlewares/validators.middleware');
const { userExist } = require('../middlewares/users.middleware') 

const usersRouter = express.Router();

usersRouter.get('/', getAllActiveUsers);

usersRouter.post('/', createUserValidators, createUser);

usersRouter.patch('/:id', userExist, updateUser);

usersRouter.delete('/:id', userExist, deleteUser);

module.exports = { usersRouter } ;