const {model, Schema} = require('mongoose')
const responseSchema = new Schema(
    {
        response: {
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
        user: {
            type:Schema.Types.ObjectId,
            ref:"user",
            required:true
        },
        owner:{
            type:Schema.Types.ObjectId,
            ref:"post",
            required:true

        }
    }
)

module.exports = model('response', responseSchema)