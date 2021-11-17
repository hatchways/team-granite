const mongoose = require('mongoose')

const BasePluginSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    cardId: {
      type: Schema.Types.ObjectId,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
)

BasePluginSchema.methods.get = async () => {
  return 'Resource'
}

BasePluginSchema.methods.post = async () => {
  return 'Resource Created'
}

BasePluginSchema.methods.update = async () => {
  return 'Resource Updated'
}

BasePluginSchema.methods.patch = async () => {
  return 'Resource Patch Update'
}

BasePluginSchema.methods.delete = async () => {
  return 'Resource Deleted'
}

BasePluginSchema.statics.attach = async (cardId, pluginId) => {
  //get the object cardId, then add the pluginId to the PluginList,
  await this.findOneAndUpdate(
    { _id: cardId },
    {
      $pullAll: {
        pluginList: {
          $each: [pluginId],
        },
      },
    }
  )

  await this.findOneAndUpdate(
    { _id: this.cardId },
    {
      $push: {
        pluginList: {
          $each: [this._id],
        },
      },
    }
  )
}

BasePluginSchema.statics.detach = async (resourceId, pluginId) => {
  //get the object resourceId, then add the pluginId to the PluginList,
  await this.findOneAndUpdate(
    { _id: cardId },
    {
      $pullAll: {
        pluginList: {
          $each: [pluginId],
        },
      },
    }
  )
}

let BasePlugin = mongoose.model('BasePlugin', BasePluginSchema)
exports.BasePlugin = BasePlugin
