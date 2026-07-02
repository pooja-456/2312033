const redis= require("redis")
require("dotenv").config()
const client=redis.createClient({socket:
  {
    host:Number(process.env.REDIS_HOST),
    port:Number(process.env.REDIS_PORT)
  }
})
client.on("error",console.error);
(async()=>{
  await client.connect(),()=>console.log("Redis connected")
})
module.exports=client

