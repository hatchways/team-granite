const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const taskSchema = new mongoose.Schema({
 name: { type: String, required: true, },
 description: { type: String, },
 columnId: { type: ObjectId, ref: 'Column', required: true }
}, {
 collection: 'tasks',
 timestamps: true
});
module.exports = Task = mongoose.model("Task", taskSchema);