const {model, Schema} = require('mongoose')
const responseSchema = new Schema(
    {
        response: {
            type:String,
            required:true
        },
        vote: {
            vote:{
                type: Number,
                required : true,
                default : 0
            },
            users:[{
                id: String,
                vote:Boolean
            }]
        },
        user: {
            type:Schema.Types.ObjectId,
            ref:"user",
            required:true
        },
        owner:{
            type:Schema.Types.ObjectId,
            ref:"post"|| "question",
            required:true

        }
    }
)

module.exports = model('response', responseSchema)