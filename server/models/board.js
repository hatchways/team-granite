const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const boardSchema = new mongoose.Schema({
 name: { type: String, required: true, },
 columnsSort: [{ type: ObjectId, ref: 'Column' },],
 columns: [{ type: ObjectId, ref: 'Column' },],
 userId: { type: ObjectId, ref: 'user', required: true }
},
 {
  collection: 'boards',
  timestamps: true
 });

module.exports = Board = mongoose.model("Board", boardSchema);