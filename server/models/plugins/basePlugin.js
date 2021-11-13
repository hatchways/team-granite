const mongoose = require('mongoose')

const BasePluginSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    resourceId: {
      type: Schema.Types.ObjectId,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

BasePluginSchema.methods.get = function () {
  return await this.findOne({ _id: this._id })
}

BasePluginSchema.methods.post = async () => {}

BasePluginSchema.methods.update = async (objectInfo) => {
  let pluginInfo = await this.findOneAndUpdate({ _id: this._id }).lean()
  await this.findOneAndUpdate(
    { _id: this._id },
    {
      $set: {
        ...pluginInfo,
        ...objectInfo,
      },
    }
  )
}

BasePluginSchema.methods.patch = async (newResourceId) => {
  await this.model(`${this.pluginKey}`).findOneAndUpdate(
    { _id: this.resourceId },
    {
      $pullAll: {
        pluginList: {
          $each: [this._id],
        },
      },
    }
  )

  await this.model(`${this.pluginKey}`).findOneAndUpdate(
    { _id: newResourceId },
    {
      $push: {
        pluginList: { $each: [this._id] },
      },
    }
  )
}

BasePluginSchema.methods.delete = async () => {
  return this.findOneAndDelete({ _id: this._id })
}

BasePluginSchema.methods.attach = async () => {
  await this.model(`${this.pluginKey}`).findOneAndUpdate(
    { _id: this.resourceId },
    {
      $pullAll: {
        pluginList: {
          $each: [this._id],
        },
      },
    }
  )

  await this.model(`${this.pluginKey}`).findOneAndUpdate(
    { _id: this.resourceId },
    {
      $push: {
        pluginList: {
          $each: [this._id],
        },
      },
    }
  )
}

BasePluginSchema.methods.detach = async () => {
  await this.model(`${this.pluginKey}`).findOneAndUpdate(
    { _id: this.resourceId },
    {
      $pullAll: {
        pluginList: {
          $each: [this._id],
        },
      },
    }
  )
}

let BasePlugin = mongoose.model('BasePlugin', BasePluginSchema)
exports.BasePlugin = BasePlugin
