const mongoose = require('mongoose')

const pluginListSchema = new mongoose.Schema(
  {
    pluginKey: {
      type: String,
      required: true,
    },
    model: {
      type: mongoose.Schema,
      required: true,
    },
  },
  { timestamps: true }
)
let PluginList = mongoose.model('PluginList', pluginListSchema)
exports.PluginList = PluginList
