const { User } = require('../models/user.model');
const { Task } = require('../models/task.model');
const { catchAsync } = require('../utils/catchAsync.util');

const createUser = catchAsync(async (req, res, next) => {

    const { name, email, password } = req.body
  
    const newUser = await User.create({ name, email, password })
  
    res.status(201).json({ newUser })
});

const getAllActiveUsers = catchAsync(async(req, res, next) => {

    const users = await User.findAll({ include: Task, where: { status: 'active' }})
  
    res.status(200).json({
      users
    })
});

const updateUser = catchAsync(async(req, res, next) => {
    const { user } = req
  
    const { name, email } = req.body;
    
    await user.update({ name, email })
  
    res.status(204).json({
        status: 'success',
        user
    })
});

const deleteUser = catchAsync(async(req, res, next) => {
    const { user } = req

    await user.update({ status: 'deleted' })

    res.status(204).json({
        message: 'User was deleted successfully'
    })
});

module.exports = { 
    createUser, 
    getAllActiveUsers, 
    updateUser, 
    deleteUser
 };

