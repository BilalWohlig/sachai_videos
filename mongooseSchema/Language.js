const mongoose = require('mongoose')
const Schema = mongoose.Schema

var schema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: ["enabled", "disabled"],
            default: "enabled",
            index: true
        },
        code: {
            type: String,
            required: true
        },
        lingualText: {
            type: String,
            required: true
        },
        vendor: [
            {
                type: Schema.Types.ObjectId,
                ref: "Vendor"
            }
        ],
        order: {
            type: Number
        },
        flag: {
            type: Boolean
        },
        audio: {
            type: Boolean
        },
        isYoutube: {
            type: Boolean
        }
    },
    {
        timestamps: true
    }
)
module.exports = mongoose.model('Language', schema)
