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
        }
    },
    {
        timestamps: true
    }
)
module.exports = mongoose.model('Vendor', schema)
