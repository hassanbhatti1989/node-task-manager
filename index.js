const express = require('express');
const app = express();
const taskRoutes = require('./routes/taskRoute')
const connectDB = require('./db/connection')
require('dotenv').config();
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

// middlewares
app.use(express.static('./public'));
app.use(express.json());
app.use('/api/v1/tasks', taskRoutes);
app.use(notFound)
app.use(errorHandlerMiddleware);

// app.get('/api/v1/tasks')        -get all task
// app.post('/api/v1/tasks')        -create task
// app.get('/api/v1/tasks/:id')        -get single task
// app.patch('/api/v1/tasks/:id')        -update single task
// app.delete('/api/v1/tasks/:id')        -delete task

const port = process.env.PORT || 5000;
const DBURI = process.env.MONGO_URI;
const start = async () => {
    try{
        await connectDB(DBURI)
        app.listen(port, ()=>{
            console.log(`server is listening on port ${port}`)
        })
    }catch(e){
        console.log(e)
    }
}
start();