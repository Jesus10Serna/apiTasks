const { express } = require('express');

// Controllers
const {
    createTask,
    getAllRegistersTask,
    getTasksByStatus,
    updateTaskById,
    deleteTask,
} = require('../controllers/task.contoller');

// Middlewares
const { createTaskValidator } = require('../middlewares/validators.middleware')
const { taskExist, statusExist } = require('../middlewares/tasks.middleware')

const tasksRouter = express.Router();

tasksRouter.get('/', getAllRegistersTask)

tasksRouter.post('/', createTaskValidator, createTask);

tasksRouter.get('/:status', statusExist, getTasksByStatus);

tasksRouter.patch('/:id', taskExist, updateTaskById);

tasksRouter.delete('/:id', taskExist, deleteTask);

tasksRouter.

module.exports = { tasksRouter };