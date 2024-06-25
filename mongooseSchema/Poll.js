const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema(
  {
    newsId: {
      type: Schema.Types.ObjectId,
      ref: 'News',
      required: true
    },
    question: {
      type: String,
      required: true
    },
    option1: {
      type: String,
      required: true
    },
    option2: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['enabled', 'disabled'],
      default: 'enabled',
      required: true
    }
  },
  { timestamps: true }
)
module.exports = mongoose.model('Poll', schema)
