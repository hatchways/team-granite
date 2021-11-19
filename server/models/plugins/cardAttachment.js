const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const basePlugin = require("./basePlugin");
const cloudinaryUpload = require("./cloudinary");

const helperFileUpload = async (user, file) => {
  const uploadedFile = await cloudinaryUpload(file);
  return await this.model("file").create({
    userId: user.id,
    cloudinaryId: uploadedFile.id,
    url: uploadedFile.url,
  });
};

const cardAttachmentSchema = new mongoose.Schema({
  files: [{ type: ObjectId, ref: "file", default: [] }],
});

cardAttachmentSchema.methods.get = async ({ body, params, query }) => {
  return { response: 200, data: { success: this.files } };
};

cardAttachmentSchema.methods.create = async ({ body, params, query }) => {
  const { user, files } = body;
  const { rewrite } = query;

  if (this.files.length === 0 || rewrite) {
    const uploadedFiles = files.map(async (file) => {
      return await helperFileUpload(user, file);
    });
    this.files = uploadedFiles;
    await this.save();
    return { response: 201, data: { success: "Files added." } };
  } else {
    throw new Error("Cannot rewrite files.");
  }
};

cardAttachmentSchema.methods.update = async ({ body, params, query }) => {
  const { user, files, index } = body;

  if (!index) {
    files.map((file) => {
      this.files.push(file);
    });
  } else {
    const uploadedFiles = files.map(async (file) => {
      return await helperFileUpload(user, file);
    });
    updatedFiles.splice(index, 0, uploadedFiles);
    this.files = updatedFiles;
  }

  await this.save();

  return { response: 200, data: { success: "Files updated." } };
};

cardAttachmentSchema.methods.delete = async ({ body, params, query }) => {
  const { indices } = body;

  if (!indices) {
    this.files.map(async (file) => {
      await this.model("file").deleteOne(file);
    });
    this.files = [];
  } else {
    const files = [];
    this.files.map(async (file, index) => {
      if (indices.includes(index)) {
        await this.model("file").deleteOne(file);
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
