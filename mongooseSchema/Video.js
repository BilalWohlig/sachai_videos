const mongoose = require('mongoose')
const Schema = mongoose.Schema

var schema = new Schema(
    {
        summary: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: ["draft", "final"],
            default: "draft",
        },
        news: [
            {
                type: Schema.Types.ObjectId,
                ref: "News"
            }
        ],
        script: {
            type: Array,
        },
        summary_logs: {
            type: Object,
        },
        script_logs: {
            type: Object
        },
        characterDescriptionLogs: {
            type: Object
        },
        title: {
            type: String,
        },
        // topic: {
        //     type: String
        // },
        version: {
            type: String,
            default: "v1"
        }
    },
    {
        timestamps: true
    }
)
module.exports = mongoose.model('Video', schema)
