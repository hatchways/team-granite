const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const columnSchema = new mongoose.Schema({
 name: { type: String, required: true, },
 tasksSort: [{ type: ObjectId, ref: 'Task' }],
 tasks: [{ type: ObjectId, ref: 'Task' }],
 boardId: { type: ObjectId, ref: 'Board', required: true }
},
 {
  collection: 'columns',
  timestamps: true
 });

module.exports = Column = mongoose.model("Column", columnSchema);