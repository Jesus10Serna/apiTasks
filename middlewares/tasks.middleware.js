const { Task } = require('../models/task.model');
const { AppError } = require('../utils/appError.util');
const { catchAsync } = require('../utils/catchAsync.util')

const taskExist = catchAsync(async (req, res, next) => {

    const { id } = req.params;

    const task = await Task.findOne({ where: { id, status: 'active' } })

    if (task === null) {
        return next(new AppError('Task not found', 404));
    }

    req.task = task;

    next();
});

const statusExist = catchAsync(async (req, res, next) => {
    
    const { status } = req.params

    const validateStatus = ['active', 'completed', 'late', 'cancelled']

    if (!validateStatus.includes(status)) {
        return next(new AppError('Status not valid', 404))
    }

    next();
});

module.exports = { taskExist, statusExist };