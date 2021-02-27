const {Schema, model} = require("mongoose")
const postSchema = new Schema(
    {
        topic:{
            type:Schema.Types.ObjectId,
            ref: "topic",
            required:true
        },
        title: {
            type:String,
            required:true
        },
        description: {
            type:String,
            required:true
        },
        vote: {
            type:Object,
            required:true,
            default:{
                vote:0,
                users:[]
            }
        },
        comments: [{
            type: Schema.Types.ObjectId,
            ref: "response",
        }],
        user: {
            type:Schema.Types.ObjectId,
            ref:"user",
            required:true
        }
    }
)

module.exports = model('post', postSchema)