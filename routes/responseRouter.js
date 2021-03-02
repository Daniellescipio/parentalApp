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
//get a response(test pruposes)
responseRouter.get("/:responseId",(req,res,next)=>{
    console.log(req.params.responseId)
    Response.findOne({_id:req.params.responseId})
    .populate('owner')
    .exec((err,response)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        console.log(response)
        res.status(200).send(response)

    })
   
})
// //get all of a users responses
// responseRouter.get("/:userId",(req,res,next)=>{
//     Response.find({user:req.params.userId},(err,responses)=>{
//         if(err){
//             res.status(500)
//             return next(err)
//         }
//         res.status(200).send(responses)
//     })
// })
//get all of a questions responses
responseRouter.get("/:questionId/question",(req,res,next)=>{
    Response.find({owner:req.params.questionId})
    .populate('owner')
    .populate('user')
    .exec((err,responses)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        res.status(200).send(responses)
    })
})
//get all of a comments to a post
responseRouter.get("/:postId/post",(req,res,next)=>{
    Response.find({owner:req.params.postId})
    .populate("owner")
    .populate('user')
    .exec((err,responses)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        res.status(200).send(responses)
    })
})
//delete a response
responseRouter.delete("/:responseId",(req,res,next)=>{
    Response.findOneAndDelete({_id:req.params.responseId}, (err)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        res.status(200).send('Your response has been deleted')
    })
})
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
//vote on a response
responseRouter.put("/:responseId/vote",(req,res,next)=>{
    Response.findOneAndUpdate(
        {_id:req.params.responseId},
        {$set:{vote:req.body}},
        {new:true},
         (err, response)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        res.status(200).send(response)
    })
})

module.exports = responseRouter 