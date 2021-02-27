const {Router} = require('express')
const postRouter = Router()
const Post = require('../models/post')
const Response = require('../models/response')
//get all posts
postRouter.get("/",(req,res,next)=>{
    Post.find((err,posts)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        res.status(200).send(posts)
    })
})
//get a user with posts
postRouter.get("/:userId",(req,res,next)=>{
    Post.find({user:req.params.userId})
    .populate("topic")
    .exec((err,posts)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        res.status(200).send(posts)
    })

})
//get all post from a specific topic
postRouter.get("/:topicId/topics",(req,res,next)=>{
    Post.find({topic:req.params.topicId})
    .populate("topic")
    .exec((err,posts)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        res.status(200).send(posts)
    })
})
//get a post with comments
postRouter.get("/:postId/post",(req,res,next)=>{
    Post.findOne({ _id: req.params.postId})
        .populate('comments')
        .populate('topic')
        .populate('user')
        .exec((err, post) => {
        if(err){
            res.status(500)
            return next(err)
            }
        console.log("Populated Post " + post.comments);
        res.status(200).send(post)
        })
})
// //add a new comment
// postRouter.put("/addComment/:postId",(req,res,next)=>{
//     req.body.owner = req.params.postId
//     req.body.user = req.user
//     const newComment = new Response(req.body)
//     Post.findOneAndUpdate(
//         {_id:req.params.postId}, 
//         {$push:{comments:newComment}},
//         {new:true},
//         (err,updatedPost)=>{
//         if(err){
//             res.status(500)
//             return next(err)
//         }
//         newComment.save()
//         res.status(200).send(updatedPost)
//     })     
// })
//delete a post
postRouter.delete("/:postId",(req,res,next)=>{
    Post.findOneAndDelete({_id:req.params.postId, user:req.user}, 
        err=>{ 
        if(err){
            res.status(500)
            return next(err)
        }
        res.status(200).send('Your Post has been deleted')
    })
})
//vote on  apost
postRouter.put("/:userId/:postId/vote",(req,res,next)=>{
    Post.findOneAndUpdate(
        {_id:req.params.postId},
        req.body,
        {new:true},
         (err, post)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        res.status(200).send(post)
    })
})
//edit a post
postRouter.put("/:postId",(req,res,next)=>{
    console.log(req.body)
    Post.findOneAndUpdate(
        {_id:req.params.postId, user:req.user},
        req.body,
        {new:true},
        (err,updatedPost)=>{
            if(err){
                res.status(500)
                return next(err)
            }
            res.status(200).send(updatedPost)
        }
    )
})

module.exports = postRouter