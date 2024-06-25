const mongoose = require('mongoose')
const Schema = mongoose.Schema

var schema = new Schema(
    {
        name: {
            type: String
        },
        description: {
            type: String
        },
        midJourneyId: {
            type: String
        },
        role: {
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
module.exports = mongoose.model('Character', schema)
