const { Schema } = require("mongoose");
const BasePlugin = require("./BasePlugin");

const CheckListSchema = new Schema({
  checklist: [{ item: String, completed: Boolean }],
});

const CardChecklistPluginSchema = BasePlugin.discriminator(
  "CardCheckListPlugin",
  new Schema(
    {
      cardCheckList: [CheckListSchema],
    },
    { timestamps: true }
  )
);

CardChecklistPluginSchema.methods.get = async (pluginId) => {
  const plugin = await this.findById(pluginId);
  return plugin.checklist;
};

CardChecklistPluginSchema.methods.create = async (pluginId, checklist) => {
  const plugin = await this.findById(pluginId);
  if (plugin.checklist.item.length === 0) {
    plugin.checklist = checklist;
    await plugin.save();
  } else {
    throw new Error("Cannot rewrite files.");
  }
};

CardChecklistPluginSchema.methods.update = async (pluginId, checklist) => {
  const plugin = await this.findbyId(pluginId);
  checklist.map((list) => {
    return plugin.checklist.push(list);
  });
  await plugin.save();
};

CardChecklistPluginSchema.methods.patch = async (pluginId) => {
  const plugin = await this.findById(pluginId);
  if (plugin.checklist.completed === false) {
    plugin.checklist.completed = true;
    await plugin.save();
  } else {
    plugin.checklist.completed = false;
    await plugin.save();
  }
};

CardChecklistPluginSchema.methods.delete = async (pluginId) => {
  const plugin = await this.findbyId(pluginId);
  plugin.checklist.map(async (list) => {
    this.model("list").deleteOne(list);
  });
  plugin.checklist = [];
  await plugin.save();
};
