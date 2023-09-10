const Task = require('../models/TaskModel')
const getAllTasks = async(req, res)=>{
    try{
        const tasks = await Task.find({});
        res.status(201).json({ tasks })
    }catch(error){
        res.status(500).json({msg: error})
    }
}

const createTasks = async (req, res)=>{
    try{
        const task = await Task.create(req.body)
        res.status(201).json({ task })
    }catch(error){
        res.status(500).json({msg: error})
    }
}

const getSingleTask = async(req, res)=>{
    // res.json({id: req.params.id})
    try{
        const {id: taskID} = req.params
        const task = await Task.findOne({_id:taskID})
        if(!task){
            return res.status(404).json({msg: `no task with id: ${taskID}`})
        }
        res.status(200).json({task})
    }catch(error){
        res.status(500).json({msg: error})
    }
}

const updateSingleTask = (req, res)=>{
    res.send('update single task')
}

const deleteTask = async (req, res) => {
    try{
        const {id: taskID} = req.params;
        const task = await Task.findOneAndDelete({_id: taskID})
        if(!task){
            return res.status(404).json({msg: `no task with id: ${taskID}`})   
        }
        res.status(200).json({task})
    }catch(error){
        res.status(500).json({msg: error})
    }
}

module.exports = {
    getAllTasks, 
    createTasks, 
    getSingleTask, 
    updateSingleTask, 
    deleteTask
}