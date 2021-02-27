const {Schema, model} = require("mongoose")
const questionSchema = new Schema(
    {
        topic:{
            type:Schema.Types.ObjectId,
            ref: "topic",
            required:true
        },
        question: {
            type:String,
            required:true
        },
        description: {
            type:String,
            required:true
        },
        answers: [{
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

module.exports = model('question', questionSchema)