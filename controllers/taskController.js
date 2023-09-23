const Task = require('../models/TaskModel')
const asyncWrapper = require('../middleware/async');
const {createCustomError} = require('../errors/custom-error')

const getAllTasks = asyncWrapper(async(req, res)=>{
    const tasks = await Task.find({});
    res.status(200).json({ tasks })
})

const createTasks = asyncWrapper(async (req, res)=>{
    const task = await Task.create(req.body)
    res.status(201).json({ task })
})

const getSingleTask = asyncWrapper(async(req, res)=>{
    // res.json({id: req.params.id})
    const {id: taskID} = req.params
    const task = await Task.findOne({_id:taskID})
    if(!task){
        return createCustomError({msg: `no task with id: ${taskID}`}, 404);
    }
    res.status(200).json({task})
})

const updateSingleTask = asyncWrapper(async (req, res)=>{
    
    const {id: taskID} = req.params;
    const task = await Task.findOneAndUpdate({_id: taskID}, req.body, {
        new: true,
        runValidators: true,
    })
    if(!task){
        return createCustomError({msg: `no task with id: ${taskID}`}, 404);
    }
    res.status(200).json({id: taskID, data: req.body})
})

const deleteTask = asyncWrapper( async (req, res) => {
    const {id: taskID} = req.params;
    const task = await Task.findOneAndDelete({_id: taskID})
    if(!task){
        return createCustomError({msg: `no task with id: ${taskID}`}, 404);
    }
    res.status(200).json({task})
})

module.exports = {
    getAllTasks, 
    createTasks, 
    getSingleTask, 
    updateSingleTask, 
    deleteTask
}