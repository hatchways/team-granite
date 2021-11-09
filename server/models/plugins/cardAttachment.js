const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const basePlugin = require("./basePlugin");

const cardAttachSchema = new mongoose.Schema({
  files: [{ type: ObjectId, ref: "file", default: [] }],
});

cardAttachSchema.statics.get = async (pluginId) => {
  const plugin = await this.findById(pluginId);
  return plugin.files;
};

cardAttachSchema.statics.create = async (pluginId, files) => {
  const plugin = await this.findById(pluginId);
  if (plugin.files.length === 0) {
    plugin.files = files;
    await plugin.save();
  } else {
    throw new Error("Cannot rewrite files.");
  }
};

cardAttachSchema.statics.update = async (pluginId, files) => {
  const plugin = await this.findbyId(pluginId);
  files.map((file) => {
    plugin.files.push(file);
  });
  await plugin.save();
};

cardAttachSchema.statics.delete = async (pluginId) => {
  const plugin = await this.findbyId(pluginId);
  plugin.files.map(async (file) => {
    this.model("file").deleteOne(file);
  });
  plugin.files = [];
  await plugin.save();
};

module.exports = CardAttachment = basePlugin.discriminator(
  cardAttachmentSchema,
  "cardAttachment"
);
