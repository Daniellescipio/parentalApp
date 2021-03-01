const {Router} = require('express')
const questionRouter = Router()
const Question = require('../models/question')
const Response = require('../models/response')

//get all questions (admin only)
questionRouter.get("/",(req,res,next)=>{
    Question.find((err,questions)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        res.status(200).send(questions)
    })
})
//get a user with questions
questionRouter.get("/:userId",(req,res,next)=>{
    Question.find({user:req.params.userId})
    .populate("topic")
    .populate('user')
    .exec((err,questions)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        res.status(200).send(questions)
    })

})
//get all questions from a specific topic
questionRouter.get("/:topicId/topics",(req,res,next)=>{
    Question.find({topic:req.params.topicId})
    .populate("topic")
    .populate('user')
    .exec((err,questions)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        res.status(200).send(questions)
    })

})
//get a question with answers
questionRouter.get("/:questionId/question",(req,res,next)=>{
    Question.findOne({ _id: req.params.questionId})
          .populate('answers')
          .populate('topic')
          .populate('user')
          .exec((err, question) => {
            if(err){
                res.status(500)
                return next(err)
            }
            console.log("Populated question " + question.answers);
            res.status(200).send(question)          
    })
})
//add a new answer
// questionRouter.put("/addAnswer/:questionId",(req,res,next)=>{
//     req.body.owner = req.params.questionId
//     req.body.user = req.user
//     const newAnswer = new Response(req.body)
//     Question.findOneAndUpdate(
//         {_id:req.params.questionId}, 
//         {$push:{answers:newAnswer}},
//         {new:true},
//         (err,updatedQuestion)=>{
//         if(err){
//             res.status(500)
//             return next(err)
//         }
//         newAnswer.save()
//         res.status(200).send(updatedQuestion)
//     })     
// })
//delete a question
questionRouter.delete("/:questionId",(req,res,next)=>{
    Question.remove({_id:req.params.questionId}, 
        err=>{ 
        if(err){
            res.status(500)
            return next(err)
        }
        
        res.status(200).send('Your question has been deleted')
    })
})
//edit a question
questionRouter.put("/:questionId",(req,res,next)=>{
    Question.findOneAndUpdate(
        {_id:req.params.question, user:req.user},
        req.body,
        {new:true},
        (err,updatedQuestion)=>{
            if(err){
                res.status(500)
                return next(err)
            }
            res.status(200).send(updatedQuestion)
        }
    )
})

module.exports = questionRouter