const {Router} = require('express')
const topicRouter = Router()
const Post = require('../models/post')
const Question = require('../models/question')
const Topic = require('../models/topic')

//get all topics
topicRouter.get("/",(req,res,next)=>{
    Topic.find((err,topics)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        res.status(200).send(topics)
    })
})
//get a topic with post and questions
topicRouter.get("/:topicId",(req,res,next)=>{
    Topic.findOne({ _id: req.params.topicId})
          .populate('posts')
          .populate('questions')
          .exec((err, topic) => {
            if(err){
                res.status(500)
                return next(err)
            }
            console.log("Populated topic " + topic.questions);
            res.status(200).send(topic)
          })
})
//add a new topic
topicRouter.post("/addTopic",(req,res,next)=>{
    req.body.user = req.user
    const newTopic = new Topic(req.body)
    newTopic.save((err, savedTopic)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        res.status(200).send(savedTopic)
    })
})
// //add a new post
// topicRouter.put("/:topicId/addPost",(req,res,next)=>{
//     req.body.topic = req.params.topicId
//     req.body.user = req.user
//     const newPost = new Post(req.body)
//     Topic.findOneAndUpdate(
//         {_id:req.params.topicId}, 
//         {$push:{posts:newPost}},
//         {new:true},
//         (err,updatedTopic)=>{
//         if(err){
//             res.status(500)
//             return next(err)
//         }
//         newPost.save()
//         res.status(200).send(updatedTopic)
//     })     
// })
//add a new question
// topicRouter.put("/:topicId/addQuestion",(req,res,next)=>{
//     req.body.topic = req.params.topicId
//     req.body.user = req.user
//     const newQuestion = new Question(req.body)
//     Topic.findOneAndUpdate(
//         {_id:req.params.topicId}, 
//         {$push:{questions:newQuestion}},
//         {new:true},
//         (err,updatedTopic)=>{
//         if(err){
//             res.status(500)
//             return next(err)
//         }
//         newQuestion.save()
//         res.status(200).send(updatedTopic)
//     })     
// })
//delete a topic
topicRouter.delete("/:topicId",(req,res,next)=>{
    Topic.findOneAndDelete({_id:req.params.postId}, 
        err=>{ 
        if(err){
            res.status(500)
            return next(err)
        }
        res.status(200).send('Your Post has been deleted')
    })
})
//switch post from one topic to another
topicRouter.put("/:oldTopicId/:newTopicId/:postId",(req,res,next)=>{
    Post.findOneAndUpdate(
        {_id:req.params.oldTopicId}, 
        {$push:{posts:req.params.postId}},
        {new:true},
        (err,updatedPost)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        Post.findOneAndUpdate(
            {_id:req.params.postId}, 
            {$pull:{comments:req.params.postId}},
            {new:true},
            (err)=>{
            if(err){
                res.status(500)
                return next(err)
            }
        })
        res.status(200).send(updatedPost)
    })     
})

//edit a topic
topicRouter.put("/:topicId",(req,res,next)=>{
    Topic.findOneAndUpdate(
        {_id:req.params.topicId, user:req.user},
        req.body,
        {new:true},
        (err,updatedTopic)=>{
            if(err){
                res.status(500)
                return next(err)
            }
            res.status(200).send(updatedTopic)
        }
    )
})

module.exports = topicRouter 