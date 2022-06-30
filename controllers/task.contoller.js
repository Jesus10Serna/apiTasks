const { Task } = require('../models/task.model');
const { catchAsync } = require('../utils/catchAsync.util')


const createTask = catchAsync(async (req, res, next) => {

    const { title, userId, limitDate } = req.body;

    const newTask = await Task.create({ title, userId, limitDate, startDate: newDate()})

    res.status(201).json({ newTask })
});

const getAllRegistersTask = catchAsync(async(req, res, next) => {

    const tasks = await Task.findAll();
  
    res.status(200).json({
      tasks
    })
});

const getTasksByStatus = catchAsync(async(req, res) => {

    const { status } = req.params;

    const tasks = await Task.findAll({ where: { status } })

    if ( tasks === null ) {
        res.status(404).json({
            status: 'error',
            message: 'tasks not found'
        })
    }

    res.status(200).json({
        status: 'succes',
        tasks
    })
});

const updateTaskById = catchAsync(async (req, res, next) => {

    const finishDate = newDate();

    const { task } = req

    const inTime = Number(task.limitDate) > Number(finishDate);

    await task.update({ status: inTime ? 'Completed' : 'late', finishDate })

    res.status(204).json({
        status: 'succes'
    })
});

const deleteTask = catchAsync(async (req, res, next) => {
    const { task } = req
  
    await task.update({ status: 'cancelled' })
  
    res.status(200).json({
      message: 'The task is cancelled'
    })
});

module.exports = {
    createTask,
    getAllRegistersTask,
    getTasksByStatus,
    updateTaskById,
    deleteTask,
};