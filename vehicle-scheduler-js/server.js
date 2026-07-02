
const express= require('express');
require("dotenv").config();

const rateLimiter=require('./middleware/rateLimiter')
const app=express();

app.use(express.json())
app.use(rateLimiter)

app.get('/depots',(req,res)=>{ return res.json(["ID","MechanicHours"])})
app.get('/vehicles',(req,res)=>{return res.json(["TaskID","Duration","Impact"])})

app.listen(process.env.PORT,()=>{console.log(`Server is running on port ${process.env.PORT}`)})


