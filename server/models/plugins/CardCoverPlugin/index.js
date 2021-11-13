const { Schema } = require("mongoose");
const { ObjectId } = Schema.Types;
const BasePlugin = require("../basePlugin");

const CardCoverSchema = new Schema(
  {
    cards: [{ type: ObjectId, ref: "Card" }],
  },
  { timestamps: true }
);

CardCoverSchema.methods.get = async function () {
  try {
    const data = await this.model("CardCover").findById(this._id);
    return { status: 200, data };
  } catch (err) {
    return { status: 500, message: err.message };
  }
};

CardCoverSchema.methods.create = async function () {
  try {
    await this.save();
    return { status: 200, data: this };
  } catch (err) {
    return { status: 500, message: err.message };
  }
};

CardCoverSchema.methods.update = async function (body) {
  try {
    await this.model("CardCover").updateOne({ _id: this._id }, { $set: body });
    return { status: 200, data: this };
  } catch (err) {
    return { status: 500, message: err.message };
  }
};

CardCoverSchema.methods.delete = async function () {
  try {
    await this.model("CardCover").findByIdAndRemove(this._id);
    return { status: 200, data: this };
  } catch (err) {
    return { status: 500, message: err.message };
  }
};

module.exports = BasePlugin.discriminator("CardCover", CardCoverSchema);
