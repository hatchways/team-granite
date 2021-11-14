const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const basePlugin = require("./basePlugin");

const cardAttachmentSchema = new mongoose.Schema({
  files: [{ type: ObjectId, ref: "file", default: [] }],
});

cardAttachmentSchema.methods.get = async ({ body, params, query }) => {
  return { response: 200, data: { success: this.files } };
};

cardAttachmentSchema.methods.create = async ({ body, params, query }) => {
  const { files } = body;
  const { rewrite } = query;

  if (this.files.length === 0 || rewrite) {
    this.files = files;
    await this.save();
    return { response: 201, data: { success: "Files added." } };
  } else {
    throw new Error("Cannot rewrite files.");
  }
};

cardAttachmentSchema.methods.update = async ({ body, params, query }) => {
  const { files, index } = body;

  if (!index) {
    files.map((file) => {
      this.files.push(file);
    });
  } else {
    const updatedFiles = Array.from(files);
    updatedFiles.splice(index, 0, files);
    this.files = updatedFiles;
  }

  await this.save();

  return { response: 200, data: { success: "Files updated." } };
};

cardAttachmentSchema.methods.delete = async ({ body, params, query }) => {
  const { indices } = body;

  if (!indices) {
    this.files.map(async (file) => {
      this.model("file").deleteOne(file);
    });
    this.files = [];
  } else {
    const files = [];
    this.files.map(async (file, index) => {
      if (indices.includes(index)) {
        this.model("file").deleteOne(file);
      } else {
        files.push(file);
      }
    });
    this.files = files;
  }

  await this.save();

  return { response: 200, data: { success: "Files deleted." } };
};

module.exports = CardAttachment = basePlugin.discriminator(
  cardAttachmentSchema,
  "cardAttachment"
);
