const {Router} = require('express')
const userRouter = Router()
const Post = require('../models/post')
const Question = require('../models/question')
const User = require('../models/user')
const Response = require('../models/response')
const Topic = require('../models/topic')

//get all users
userRouter.get("/",(req,res,next)=>{
    User.find((err,users)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        res.status(200).send(users)
    })
})
//get a user with post and questions
userRouter.get("/:userId",(req,res,next)=>{
    User.findOne({ _id: req.params.userId})
        .populate('posts')
        .populate('questions')
        .exec((err, user) => {
            if(err){
                res.status(500)
                return next(err)
            }
        console.log(`Populated user ${user.username}: ${user.questions}${user.posts}`);
        res.status(200).send(user)
        })
       
})
//add a new post
userRouter.put("/:topicId/addPost",(req,res,next)=>{
    req.body.topic = req.params.topicId
    req.body.user = req.user
    const newPost = new Post(req.body)
    User.findOneAndUpdate(
        {_id:req.user}, 
        {$push:{posts:newPost}},
        {new:true},
        (err,updatedUser)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        Topic.findOneAndUpdate(
            {_id:req.params.topicId}, 
            {$push:{posts:newPost}},
            {new:true},
            (err)=>{
            if(err){
                res.status(500)
                return next(err)
            }
        }) 
        newPost.save()
        res.status(200).send(updatedUser)
    })     
})
//add a new question
userRouter.put("/:topicId/addQuestion",(req,res,next)=>{
    req.body.topic = req.params.topicId
    req.body.user = req.user
    const newQuestion = new Question(req.body)
    User.findOneAndUpdate(
        {_id:req.user}, 
        {$push:{questions:newQuestion}},
        {new:true},
        (err,updatedUser)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        Topic.findOneAndUpdate(
            {_id:req.params.topicId}, 
            {$push:{questions:newQuestion}},
            {new:true},
            (err)=>{
            if(err){
                res.status(500)
                return next(err)
            }
        })     
        newQuestion.save()
        res.status(200).send(updatedUser)
    })     
})
//add a new comment to a post
userRouter.put("/:postId/addComment",(req,res,next)=>{
    console.log(req.body)
    req.body.owner = req.params.postId
    req.body.user = req.user
    const newResponse = new Response(req.body)
    User.findOneAndUpdate(
        {_id:req.user}, 
        {$push:{responses:newResponse}},
        {new:true},
        (err,updatedUser)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        Post.findOneAndUpdate(
            {_id:req.params.postId}, 
            {$push:{comments:newResponse}},
            {new:true},
            (err)=>{
            if(err){
                res.status(500)
                return next(err)
            }
        }) 
        newResponse.save()
        res.status(200).send(newResponse)
    })     
})
//add a new answer to a question
userRouter.put("/:questionId/addAnswer",(req,res,next)=>{
    req.body.owner = req.params.questionId
    req.body.user = req.user
    const newResponse = new Response(req.body)
    User.findOneAndUpdate(
        {_id:req.user}, 
        {$push:{responses:newResponse}},
        {new:true},
        (err)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        Question.findOneAndUpdate(
            {_id:req.params.questionId}, 
            {$push:{answers:newResponse}},
            {new:true},
            (err)=>{
            if(err){
                res.status(500)
                return next(err)
            }
        }) 
        newResponse.save()
        res.status(200).send(newResponse)
    })     
})
//delete a comment from a post
userRouter.put("/:postId/:commentId/removeComment",(req,res,next)=>{
    User.findOneAndUpdate(
        {_id:req.user}, 
        {$pull:{responses:req.params.commentId}},
        {new:true},
        (err,updatedUser)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        Post.findOneAndUpdate(
            {_id:req.params.postId}, 
            {$pull:{comments:req.params.commentId}},
            {new:true},
            (err)=>{
            if(err){
                res.status(500)
                return next(err)
            }
        })   
        Response.remove({_id:req.params.commentId})  
        res.status(200).send(updatedUser)
    })     
})
//delete an answer from a question
userRouter.put("/:questionId/:answerId/removeAnswer",(req,res,next)=>{
    User.findOneAndUpdate(
        {_id:req.user}, 
        {$pull:{responses:req.params.answerId}},
        {new:true},
        (err,updatedUser)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        Question.findOneAndUpdate(
            {_id:req.params.questionId}, 
            {$pull:{answers:req.params.answerId}},
            {new:true},
            (err)=>{
            if(err){
                res.status(500)
                return next(err)
            }
        })   
        Response.remove({_id:req.params.answerId})  
        res.status(200).send(updatedUser)
    })     
})
//delete a post
userRouter.put("/:topicId/:postId/removePost",(req,res,next)=>{
    User.findOneAndUpdate(
        {_id:req.user}, 
        {$pull:{posts:req.params.postId}},
        {new:true},
        (err,updatedUser)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        Topic.findOneAndUpdate(
            {_id:req.params.topicId}, 
            {$pull:{posts:req.params.postId}},
            {new:true},
            (err)=>{
            if(err){
                res.status(500)
                return next(err)
            }
        })   
        Post.deleteOne({_id:req.params.postId})  
        res.status(200).send(updatedUser)
    })     
})
//delete a question
userRouter.put("/:topicId/:questionId/removeQuestion",(req,res,next)=>{
    User.findOneAndUpdate(
        {_id:req.user}, 
        {$pull:{questions:req.params.questionId}},
        {new:true},
        (err,updatedUser)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        Topic.findOneAndUpdate(
            {_id:req.params.topicId}, 
            {$pull:{questions:req.params.questionId}},
            {new:true},
            (err)=>{
            if(err){
                res.status(500)
                return next(err)
            }
        })   
        Question.remove({_id:req.params.questionId})  
        res.status(200).send(updatedUser)
    })     
})
//delete a user
userRouter.delete("/delete",(req,res,next)=>{
    User.findOneAndDelete({_id:req.user}, 
        err=>{ 
        if(err){
            res.status(500)
            return next(err)
        }
        res.status(200).send('You have been deleted')
    })
})
//edit a user
userRouter.put("/update",(req,res,next)=>{
    User.findOneAndUpdate(
        {_id:req.user},
        req.body,
        {new:true},
        (err,updatedUser)=>{
            if(err){
                res.status(500)
                return next(err)
            }
            res.status(200).send(updatedUser)
        }
    )
})

module.exports = userRouter 