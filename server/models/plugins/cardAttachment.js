const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const basePlugin = require("./basePlugin");

const cardAttachmentSchema = new mongoose.Schema({
  files: [{ type: ObjectId, ref: "file", default: [] }],
});

cardAttachmentSchema.statics.get = async (pluginId) => {
  const plugin = await this.findById(pluginId);
  return plugin.files;
};

cardAttachmentSchema.statics.create = async (pluginId, files) => {
  const plugin = await this.findById(pluginId);
  if (plugin.files.length === 0) {
    plugin.files = files;
    await plugin.save();
  } else {
    throw new Error("Cannot rewrite files.");
  }
};

cardAttachmentSchema.statics.update = async (pluginId, files) => {
  const plugin = await this.findbyId(pluginId);
  files.map((file) => {
    plugin.files.push(file);
  });
  await plugin.save();
};

cardAttachmentSchema.statics.delete = async (pluginId) => {
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
