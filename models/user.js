const {Schema, model} = require('mongoose')

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true, 
            lowercase: true, 
            unique:true,
        }, 
        password : {
            type:String, 
            required:true
        },
        memberSince: {
            type: Date,
            default: Date.now
        },
        isAdmin : {
            type:Boolean,
            default: false
        },
        posts:[{
            type: Schema.Types.ObjectId,
            ref: "post"
        }],
        questions:[{
            type: Schema.Types.ObjectId,
            ref: "question"
        }],
        responses:[{
            type: Schema.Types.ObjectId,
            ref: "response"
        }]
    }
)
module.exports = model("user", userSchema)