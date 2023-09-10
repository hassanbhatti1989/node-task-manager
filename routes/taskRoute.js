const express = require('express');
const router = express.Router();
const {getAllTasks, createTasks, getSingleTask, updateSingleTask, deleteTask} = require('../controllers/taskController');

router.route('/').get(getAllTasks)
router.route('/').post(createTasks)
router.route('/:id').get(getSingleTask)
router.route('/:id').patch(updateSingleTask)
router.route('/:id').delete(deleteTask)

// other way to do this
// router.route('/').get(getAllTasks).post(createTasks);
// router.route('/:id').get(getSingleTask).patch(updateSingleTask).delete(deleteTask)



module.exports = router;