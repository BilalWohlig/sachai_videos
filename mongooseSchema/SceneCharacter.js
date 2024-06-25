const mongoose = require('mongoose')
const Schema = mongoose.Schema

var schema = new Schema(
    {
        sceneId: {
            type: Schema.Types.ObjectId,
            ref: "Scene"
        },
        characterId: {
            type: Schema.Types.ObjectId,
            ref: "Character"
        },
        presence: {
            type: String
        }
    },
    {
        timestamps: true
    }
)
module.exports = mongoose.model('SceneCharacter', schema)
