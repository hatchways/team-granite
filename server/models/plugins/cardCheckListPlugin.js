const mongoose = require("mongoose");
const BasePlugin = require("./BasePlugin");

const CheckListSchema = new mongoose.Schema({
  checkListItem: {
    type: String,
  },
  isChecked: {
    type: Boolean,
    default: false,
  },
});

const ChecklistPluginSchema = BasePlugin.discriminator(
  "CardCheckListPlugin",
  new mongoose.Schema(
    {
      checklist: [CheckListSchema],
    },
    { timestamps: true }
  )
);

ChecklistPluginSchema.methods.get = async ({ params }) => {
  const { pluginId } = params;
  const data = await this.model("CardCheckListPlugin").findById(pluginId);
  if (data) {
    return { status: 200, data };
  } else {
    return {
      status: 300,
      message: "Unable to get checklist",
    };
  }
};

ChecklistPluginSchema.methods.create = async ({ body }) => {
  const { checkListItem } = body;
  const data = await mongoose.model("CardCheckListPlugin").create({
    checkListItem,
    isChecked: false,
  });
  if (data) {
    return {
      status: 200,
      data,
    };
  } else {
    return {
      status: 300,
      message: "Unable to create checklist",
    };
  }
};

ChecklistPluginSchema.methods.update = async ({ body }) => {
  const { checkListItem, pluginId, isChecked } = body;
  const data = await mongoose
    .model("CardCheckListPlugin")
    .findByIdAndUpdate(
      { id: pluginId },
      { update: { checkListItem: checkListItem, isChecked: isChecked } }
    );
  if (data) {
    return {
      status: 200,
      data,
    };
  } else {
    return {
      status: 300,
      message: "Data not found",
    };
  }
};

ChecklistPluginSchema.methods.patch = async ({ body }) => {
  const { pluginId, isChecked } = body;
  const data = await mongoose
    .model("CardCheckListPlugin")
    .findByIdAndUpdate({ id: pluginId }, { toggle: { isChecked: isChecked } });
  if (data) {
    return {
      status: 200,
      data,
    };
  } else {
    return {
      status: 300,
      message: "Data not found",
    };
  }
};

ChecklistPluginSchema.methods.delete = async ({ body }) => {
  const { pluginId, isChecked } = body;
  const data = await mongoose
    .model("CardCheckListPlugin")
    .findByIdAndUpdate({ id: pluginId }, { delete: { isChecked: isChecked } });
  if (data) {
    return {
      status: 200,
      data,
    };
  } else {
    return {
      status: 300,
      message: "Data not found",
    };
  }
};