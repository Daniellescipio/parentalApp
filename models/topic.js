const {model, Schema} = require('mongoose')
const topicSchema = new Schema(
    {
        topic: {
            type:String,
            required:true
        },
        posts:[{
            type:Schema.Types.ObjectId,
            ref:"post"

        }],
        questions:[{
            type:Schema.Types.ObjectId,
            ref:"question"
        }]
    }
)

module.exports = model('topic', topicSchema)