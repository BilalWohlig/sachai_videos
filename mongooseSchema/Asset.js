const mongoose = require('mongoose')
const Schema = mongoose.Schema

var schema = new Schema(
    {
        type: {
            type: String
        },
        name: {
            type: String
        },
        description: {
            type: String
        },
        midJourneyId: {
            type: String
        },
        scriptId: {
            type: Schema.Types.ObjectId,
            ref: "Video"
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
module.exports = mongoose.model('Asset', schema)
