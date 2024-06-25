const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    languages: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Language',
        required: true
      }
    ],
    vendors: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Vendor',
        required: true
      }
    ],
    status: {
      type: String,
      enum: ['enabled', 'disabled'],
      default: 'enabled',
      index: true
    },
    order: {
      type: Number,
      index: true
    }
  },
  { timestamps: true }
)
module.exports = mongoose.model('Category', schema)
