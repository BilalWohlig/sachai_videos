const mongoose = require('mongoose')
const Schema = mongoose.Schema

var schema = new Schema(
    {
        sceneId: {
            type: Schema.Types.ObjectId,
            ref: "Scene"
        },
        assetId: {
            type: Schema.Types.ObjectId,
            ref: "Asset"
        },
        usage: {
            type: String
        }
    },
    {
        timestamps: true
    }
)
module.exports = mongoose.model('YoutubeChannel', schema)
