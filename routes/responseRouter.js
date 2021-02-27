const {Router, response} = require('express')
const responseRouter = Router()
const Response = require('../models/response')
//get all responses(testing purposes only)
responseRouter.get("/",(req,res,next)=>{
    Response.find( (err,responses)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        res.status(200).send(responses)
    })
   
})
//get a response
responseRouter.get("/:responseId",(req,res,next)=>{
    Response.find({_id:req.params.responseId}, (err,response)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        res.status(200).send(response)
    })
   
})
//get all of a users responses
responseRouter.get("/userId",(req,res,next)=>{
    Response.find({user:req.params.userId},(err,responses)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        res.status(200).send(responses)
    })
})
//get all of a questions responses
responseRouter.get("/questionId",(req,res,next)=>{
    Post.find({user:req.params.questionId},(err,responses)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        res.status(200).send(responses)
    })
})
// //get all of a comments to a post
// responseRouter.get("/:postId",(req,res,next)=>{
//     Post.find({user:req.params.postId},(err,responses)=>{
//         if(err){
//             res.status(500)
//             return next(err)
//         }
//         res.status(200).send(responses)
//     })
// })
//vote on a response
responseRouter.put("/:userId/:responseId/vote",(req,res,next)=>{
    Response.findOneAndUpdate(
        {_id:req.params.responseId},
        req.body,
        {new:true},
         (err, response)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        res.status(200).send(response)
    })
})
//delete a response
// responseRouter.delete("/:responseId",(req,res,next)=>{
//     Response.findOneAndDelete({_id:req.params.responseId}, (err)=>{
//         if(err){
//             res.status(500)
//             return next(err)
//         }
//         res.status(200).send('Your response has been deleted')
//     })
// })
//edit a response
responseRouter.put("/:responseId",(req,res,next)=>{
    Response.findOneAndUpdate(
        {_id:req.params.responseId},
        req.body,
        {new:true},
        (err,updatedResponse)=>{
            console.log()
            if(err){
                res.status(500)
                return next(err)
            }
            res.status(200).send(updatedResponse)
            console.log(updatedResponse, req.body, req.params)
        }
    )
})

module.exports = responseRouter 