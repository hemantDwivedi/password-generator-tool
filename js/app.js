import express from 'express';

import indexRoute from './routes/index.js'
const app = express();
const port = 8000;


app.use(express.json())

app.use('/', indexRoute)
app.listen(port, ()=>{
    console.log('SERVER RUNNING ON PORT', port);
})




