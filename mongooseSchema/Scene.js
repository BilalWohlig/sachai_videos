const mongoose = require('mongoose')
const Schema = mongoose.Schema

var schema = new Schema(
    {
        scriptId: {
            type: Schema.Types.ObjectId,
            ref: "Video"
        },
        setting: {
            type: String,
        },
        description: {
            type: String,
        },
        sceneNumber: {
            type: Number
        },
        midJourneyId: {
            type: String
        },
        mainUrl: {
            type: String
        },
        urls: [
            {
                type: String
            }
        ],
        logs: {
            type: Object
        }
    },
    {
        timestamps: true
    }
)
module.exports = mongoose.model('Scene', schema)
