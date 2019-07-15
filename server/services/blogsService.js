import mongoose from 'mongoose'
let objectId = mongoose.Schema.Types.ObjectId

let _schema = new mongoose.Schema({
      title: { type: String, unique: true, maxlength: 60 },
      slug: { type: String, unique: true, lowercase: true },
      summary: { type: String, maxlength: 120 },
      author: { type: String },
      body: { type: String },
      tags: [{ type: String }]
}, { timestamps: true })

export default mongoose.model('Blog', _schema)