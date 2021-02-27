const {model, Schema} = require('mongoose')
const voteSchema = new Schema(
    {
        vote: {
            type:Number,
            required:true
        },
        users:[{
            type:Schema.Types.ObjectId,
            ref:"user"

        }]
    }
)

module.exports = model('vote', voteSchema)