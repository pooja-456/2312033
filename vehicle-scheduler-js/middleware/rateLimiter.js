const redis= require("../redis/redisClient")
require("dotenv").config();
const rateLimiter=async(req,res,next)=>{
  const ip=req.ip;
  const windowSize=Number(process.env.WINDOW_SIZE);
  const maxRequest=Number(process.env.MAX_REQUEST);
  const now=Date.now();
  const start=now-windowSize*1000;
  let reqs=(await redis.lRange(ip,0,-1).map(Number)).filter(timestamp=>timestamp>start);
  if(reqs.length>=maxRequest){
    return res.status(429).json({success:false,message:"Too many requests, please try again later"})
  }
  redis.push(now);
  await redis.expire(ip);
  if(reqs.length===0){
    await redis.rPush(ip,now);
    await redis.expire(ip,windowSize);
  }
  next();
}
